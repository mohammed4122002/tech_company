import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Tech Company contact information",
  description: "A Tech Company Blog for Sharing Knowledge and Insights on Technology and Innovation ",
};
const Contact = () => {
  return (
    <div className={styles.container} >
      <h1 className={styles.title} >Let&apos;s keep in Touch </h1> 
      <div className={styles.content} >
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt="Contact Image"
           fill
            className={styles.image}
          />
        </div>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className={styles.input}
            required
          />
          <textarea
            placeholder="Your Message"
            className={styles.textArea}
            cols={30}
            rows={10}
            required
          ></textarea>
          <Button text='Send Message' url='#' />
            
       

        </form>
      </div>
    </div>
  )
}

export default Contact