import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image';
import { Metadata } from 'next';
export interface IPost {
  _id: string; // أو: Types.ObjectId لو كنت تريد استخدامه من mongoose
  title: string;
  desc: string;
  img: string;
  content: string;
  username: string;
}

async function getData(_id: string) {
  const res = await fetch(`http://localhost:3000/api/posts/${_id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export async function generateMetadata({ params } : {params:{_id:string}}): Promise<Metadata> {
  const data :IPost = await getData(params._id);
  return {
    
    title: data.title,
    description: data.desc,
    openGraph: {
      title: data.title,
      description: data.desc,
      images: [
        {
          url: data.img,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
    },
  }
}






const BlogPost =  async({ params } : {params:{_id:string}} ) => {
  const data :IPost = await getData(params._id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
          {data.desc}
          </p>
          <div className={styles.author}>
            <Image
             src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
             src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
      {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
