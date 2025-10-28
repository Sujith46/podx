import { NextResponse } from "next/server";
import { createGenerateVideoJob, GenerateVideoJobOptions } from "@/server/job-queue";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<GenerateVideoJobOptions>;

    if (!body || !body.files || !Array.isArray(body.files) || body.files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const options: GenerateVideoJobOptions = {
      aspectRatio: (body.aspectRatio as any) ?? "9:16",
      includeCaptions: Boolean(body.includeCaptions ?? true),
      includeWaveform: Boolean(body.includeWaveform ?? true),
      template: body.template ?? "Minimal",
      files: body.files as string[],
    };

    // TODO: Validate auth/permission for the requesting user/workspace.
    // TODO: Validate files exist in your storage and collect their IDs/URLs.
    // TODO: Instead of a local in-memory queue, enqueue a real background job
    //       (e.g., BullMQ/Redis, Cloudflare Queues, or a serverless workflow)
    //       that runs your FFmpeg/media composer with captions and templates.

    const job = createGenerateVideoJob(options);
    return NextResponse.json({ id: job.id, status: job.status, progress: job.progress });
  } catch (err) {
    // TODO: Improve error typing and logging (e.g., Sentry).
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
