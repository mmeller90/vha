"use client"
import {useEffect, useState} from 'react';
import Card from './_components/Card';
import styles from "./page.module.css"

const Home = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQueueStatus = async () => {
    const res = await fetch(`/api/queue/status`);
    
    const body = await res.json();

    setQueues(body.queues)

  }

  const getQueueValue = async (queueName) => {
    setLoading(true)
    const res = await fetch(`/api/${queueName}?timeout=${1000}`)
    setLoading(false)

    if (res.status === 204) {
      alert('No message in queue.')
      return
    }

    const data = await res.json()
    alert(data.message)
  }

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 10000);

    return () => clearInterval(interval)
  }, [])



  return (<div className={styles.cards}>
    {queues.map(queue => (
      <Card 
        key={queue.name} 
        name={queue.name} 
        value={queue.size} 
        clicked={() => {getQueueValue(queue.name)}}
      />
    ))}</div>);
}

export default Home;