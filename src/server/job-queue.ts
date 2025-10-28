export type JobStatus = "queued" | "processing" | "completed" | "failed";

export interface GenerateVideoJobOptions {
  aspectRatio: "9:16" | "1:1" | "16:9";
  includeCaptions: boolean;
  includeWaveform: boolean;
  template?: string;
  files: string[]; // filenames or IDs
}

export interface Job {
  id: string;
  type: "generate-video";
  status: JobStatus;
  progress: number; // 0-100
  createdAt: number;
  updatedAt: number;
  options: GenerateVideoJobOptions;
  error?: string;
}

// Simple in-memory queue persisted on global between hot reloads
const g = globalThis as any;
if (!g.__PODX_JOB_QUEUE__) {
  g.__PODX_JOB_QUEUE__ = {
    jobs: new Map<string, Job>(),
    timers: new Map<string, NodeJS.Timeout>(),
  };
}

const store: {
  jobs: Map<string, Job>;
  timers: Map<string, NodeJS.Timeout>;
} = g.__PODX_JOB_QUEUE__;

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export function createGenerateVideoJob(options: GenerateVideoJobOptions): Job {
  const id = randomId();
  const now = Date.now();
  const job: Job = {
    id,
    type: "generate-video",
    status: "queued",
    progress: 0,
    createdAt: now,
    updatedAt: now,
    options,
  };
  store.jobs.set(id, job);

  // Simulate background progress
  const timer = setInterval(() => {
    const j = store.jobs.get(id);
    if (!j) return;
    if (j.status === "queued") j.status = "processing";
    const inc = 10 + Math.floor(Math.random() * 15);
    j.progress = Math.min(100, j.progress + inc);
    j.updatedAt = Date.now();
    if (j.progress >= 100) {
      j.status = "completed";
      clearInterval(timer);
      store.timers.delete(id);
    }
  }, 1200);

  store.timers.set(id, timer);
  return job;
}

export function getJob(id: string): Job | undefined {
  return store.jobs.get(id);
}
