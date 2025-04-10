import { NextRequest, NextResponse} from "next/server";
import {dequeue, enqueue} from "../../../queue/queue"

type RouteRequestParams = {params: {queue_name: string}};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest, {params}: RouteRequestParams) {
  const {queue_name} = await params;
  const message = await req.json();

  enqueue(queue_name, message)

  return NextResponse.json({
    status: 200
  });
}

export async function GET(req: NextRequest, {params}: RouteRequestParams) {
  const {queue_name} = await params;
  const timeoutParam = req.nextUrl.searchParams.get('timeout');

  const timeout = Math.max(0, parseInt(timeoutParam || '10000'));

  const start = Date.now()

  while ((Date.now() - start) < timeout) {
    const message = dequeue(queue_name);

    if (message !== undefined) {
      return NextResponse.json({ message });
    }

    await delay(100);
  }

  return new NextResponse(null, { status: 204 })
}