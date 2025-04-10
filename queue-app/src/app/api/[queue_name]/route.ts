import { NextRequest, NextResponse} from "next/server";

const queues: Record<string, any[]> = {};

type RouteRequestParams = {params: {queue_name: string}};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function POST(req: NextRequest, {params}: RouteRequestParams) {
  const {queue_name} = params;
  const message = await req.json();

  if (!queues[queue_name]) {
    queues[queue_name] = [];
  }

  queues[queue_name].push(message);

  return NextResponse.json({
    status: 200
  });
}

export async function GET(req: NextRequest, {params}: RouteRequestParams) {
  const {queue_name} = params;
  const timeoutParam = req.nextUrl.searchParams.get('timeout');

  const timeout = Math.max(0, parseInt(timeoutParam || '10000'));

  const start = Date.now()

  while ((Date.now() - start) < timeout) {
    const queue = queues[queue_name] || []

    if (queue.length > 0) {
      const message = queue.shift()
      return NextResponse.json({ message })
    }

    await delay(100)
  }

  return new NextResponse(null, { status: 204 })
}