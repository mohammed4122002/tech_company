'use client'; // 👈 ضروري جدًا!

import React from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
interface Post {
  id: number;
  img: string;
  title: string;
  desc: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Dashboard = () => {
  const { data, error, isLoading } = useSWR<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

 const session = useSession()
 
 
console.log(session);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load posts.</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.desc}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
