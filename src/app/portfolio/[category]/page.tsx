'use client';

import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items, PortfolioItem, PortfolioData } from "./data";
import { notFound } from "next/navigation";

const getData = (category: string): PortfolioItem[] => {
  const data: PortfolioData = items;
  switch (category) {
    case "Application":
      return data.applications;
    case "illustration":
      return data.illustrations;
    case "websites":
      return data.websites;
    default:
      notFound();
  }
};

const Category = ({ params }: { params: { category: string } }) => {
  const data = getData(params.category);

  return (
    <div className={styles.container}>
      <div className={styles.catTitle}>{params.category}</div>

      {data.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.content}>
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className={styles.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
