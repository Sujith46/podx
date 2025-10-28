"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileAudio, 
  X, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  Volume2
} from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  duration?: string;
  size: string;
}

export function UploadView() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [generateVideo, setGenerateVideo] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "1:1" | "16:9">("9:16");
  const [includeCaptions, setIncludeCaptions] = useState(true);
  const [includeWaveform, setIncludeWaveform] = useState(true);
  const [videoJobId, setVideoJobId] = useState<string | null>(null);
  const [videoJobStatus, setVideoJobStatus] = useState<'idle' | 'queued' | 'processing' | 'completed' | 'failed'>("idle");
  const [videoJobProgress, setVideoJobProgress] = useState<number>(0);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading',
      size: formatFileSize(file.size)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac']
    },
    multiple: true
  });

  const simulateUpload = (fileId: string) => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100);
          const newStatus = newProgress === 100 ? 'processing' : 'uploading';
          
          if (newProgress === 100) {
            setTimeout(() => {
              setUploadedFiles(prev => prev.map(f => 
                f.id === fileId ? { ...f, status: 'complete', duration: '45:32' } : f
              ));
              setIsUploading(false);
            }, 2000);
          }
          
          return { ...file, progress: newProgress, status: newStatus };
        }
        return file;
      }));
    }, 500);

    setTimeout(() => clearInterval(interval), 8000);
  };

  const handleGenerateVideo = async () => {
    try {
      setIsGeneratingVideo(true);
      setVideoJobStatus('queued');
      setVideoJobProgress(0);

      const files = uploadedFiles.filter(f => f.status === 'complete').map(f => f.file.name);
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aspectRatio,
          includeCaptions,
          includeWaveform,
          template: 'Minimal',
          files,
        })
      });
      if (!res.ok) throw new Error('Failed to start job');
      const data = await res.json();
      setVideoJobId(data.id);
      setVideoJobStatus(data.status);
      setVideoJobProgress(data.progress ?? 0);
    } catch (e) {
      setVideoJobStatus('failed');
      setIsGeneratingVideo(false);
    }
  };

  useEffect(() => {
    if (!videoJobId) return;
    let mounted = true;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/jobs/${videoJobId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setVideoJobStatus(data.status);
        setVideoJobProgress(data.progress ?? 0);
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
          setIsGeneratingVideo(false);
        }
      } catch (_) {
        // ignore transient errors
      }
    }, 1500);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [videoJobId]);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileAudio className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'default';
      case 'error':
        return 'destructive';
      case 'processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Upload Podcast</h1>
        <p className="text-muted-foreground">
          Upload your podcast episodes to start AI-powered content transformation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Audio Files</CardTitle>
            <CardDescription>
              Drag and drop your podcast files or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p className="text-lg">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-lg mb-2">Drag & drop audio files here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to select files
                  </p>
                  <Button variant="outline">
                    Browse Files
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Supported formats: MP3, WAV, M4A, AAC, OGG, FLAC (Max 500MB per file)
            </div>
          </CardContent>
        </Card>

        {/* Podcast Details */}
        <Card>
          <CardHeader>
            <CardTitle>Podcast Details</CardTitle>
            <CardDescription>
              Add metadata to help organize your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="mb-1">Podcast Title</Label>
              <Input
                id="title"
                placeholder="Enter podcast episode title"
                value={podcastTitle}
                onChange={(e) => setPodcastTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="mb-1">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the episode content"
                value={podcastDescription}
                onChange={(e) => setPodcastDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="mb-1">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Business, Technology"
                />
              </div>
              <div>
                <Label htmlFor="tags" className="mb-1">Tags</Label>
                <Input
                  id="tags"
                  placeholder="e.g., AI, Marketing"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audio → Video Generation */}
      {uploadedFiles.some(f => f.status === 'complete') && (
        <Card>
          <CardHeader>
            <CardTitle>AI Audio → Video</CardTitle>
            <CardDescription>
              Turn your audio into a branded video with captions and templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-medium">Aspect Ratio</div>
                <div className="grid grid-cols-3 gap-2">
                  {(["9:16","1:1","16:9"] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAspectRatio(r)}
                      className={`text-sm border rounded-md px-3 py-2 ${aspectRatio === r ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Choose target platform format (Reels/Shorts, Square, Landscape)</div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Visual Options</div>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeCaptions} onChange={(e) => setIncludeCaptions(e.target.checked)} />
                    Include Captions
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeWaveform} onChange={(e) => setIncludeWaveform(e.target.checked)} />
                    Show Waveform/Progress Bar
                  </label>
                </div>
                <div className="text-xs text-muted-foreground">Captions and waveform improve engagement and accessibility.</div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Branding Template</div>
                <div className="grid grid-cols-2 gap-2">
                  {['Minimal','Gradient','Bold','Clean'].map(t => (
                    <button key={t} type="button" className="border rounded-md px-3 py-2 text-sm hover:bg-muted/50">{t}</button>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Templates control background, fonts, and overlays.</div>
              </div>
            </div>

            {videoJobStatus !== 'idle' && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Job Status: {videoJobStatus}</span>
                  <span>{Math.round(videoJobProgress)}%</span>
                </div>
                <Progress value={videoJobProgress} className="h-1" />
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button className="gap-2" onClick={handleGenerateVideo} disabled={isGeneratingVideo || !uploadedFiles.some(f => f.status === 'complete')}>
                <Upload className="w-4 h-4" />
                {isGeneratingVideo ? 'Generating...' : 'Generate Video'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>
              Track the progress of your uploaded podcast episodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getStatusIcon(file.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{file.file.name}</h4>
                      <Badge variant={getStatusColor(file.status) as any}>
                        {file.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{file.size}</span>
                      {file.duration && <span>{file.duration}</span>}
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}
                    
                    {file.status === 'processing' && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Processing with AI...</span>
                          <span>Please wait</span>
                        </div>
                        <Progress value={100} className="h-1" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {file.status === 'complete' && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Play className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Options */}
      {uploadedFiles.some(f => f.status === 'complete') && (
        <Card>
          <CardHeader>
            <CardTitle>AI Processing Options</CardTitle>
            <CardDescription>
              Choose what content to generate from your podcast
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="transcription" defaultChecked />
                <label htmlFor="transcription" className="text-sm font-medium">
                  Full Transcription
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="summary" defaultChecked />
                <label htmlFor="summary" className="text-sm font-medium">
                  Episode Summary
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="highlights" defaultChecked />
                <label htmlFor="highlights" className="text-sm font-medium">
                  Key Highlights
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="clips" defaultChecked />
                <label htmlFor="clips" className="text-sm font-medium">
                  Video Clips
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="social" defaultChecked />
                <label htmlFor="social" className="text-sm font-medium">
                  Social Media Posts
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="blog" />
                <label htmlFor="blog" className="text-sm font-medium">
                  Blog Article
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="audio2video" checked={generateVideo} onChange={(e) => setGenerateVideo(e.target.checked)} />
                <label htmlFor="audio2video" className="text-sm font-medium">
                  Audio → Video (with captions)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                className="gap-2"
                disabled={!uploadedFiles.some(f => f.status === 'complete')}
              >
                <Upload className="w-4 h-4" />
                Start AI Processing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
