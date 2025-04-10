"use client"
import {useEffect, useState} from 'react';

const Home = () => {
  const [queues, setQueues] = useState([]);

  const fetchQueueStatus = async () => {
    const res = await fetch(`/api/queue/status`);
    
    const body = await res.json();

    setQueues(body.queues)

  }

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 10000);

    return () => clearInterval(interval)
  }, [])



  return <div>{queues.map(queue => (<div key={queue.name}>{queue.name}</div>))}</div>
}

export default Home;