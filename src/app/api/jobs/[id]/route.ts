import { NextResponse } from "next/server";
import { getJob } from "@/server/job-queue";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: job.id, status: job.status, progress: job.progress, options: job.options });
}
