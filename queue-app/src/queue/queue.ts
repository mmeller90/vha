const queues: Record<string, any[]> = {}

export function enqueue(queueName: string, message: any) {
  if (!queues[queueName]) {
    queues[queueName] = []
  }
  queues[queueName].push(message)
}

export function dequeue(queueName: string): any | undefined {
  if (!queues[queueName]) return undefined
  return queues[queueName].shift()
}

export function queueSize(queueName: string): number {
  return queues[queueName]?.length || 0
}