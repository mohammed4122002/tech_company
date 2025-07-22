
import React from 'react'
import styles from "./footer.module.css";
import Image from 'next/image';
const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 Lamamia. All rights reserved.</div>
      <div className={styles.social}>
     
                  <Image className={styles.icon} src="/1.png" alt="Lama Dev" width={15} height={15} />
                  <Image className={styles.icon} src="/2.png" alt="Lama Dev" width={15} height={15} />
                  <Image className={styles.icon} src="/3.png" alt="Lama Dev" width={15} height={15} />
                  <Image className={styles.icon} src="/4.png" alt="Lama Dev" width={15} height={15} />
      

      </div>
      </div>
  )
}

export default Footer