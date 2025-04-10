import { NextResponse } from "next/server";
import QueueNames from "../../../queueNames";
import {queueSize} from "../../../../queue/queue";

export function GET() {
  return NextResponse.json({
    status: 200,
    queues: QueueNames.map(name => ({name, size: queueSize(name)}))
  })
}