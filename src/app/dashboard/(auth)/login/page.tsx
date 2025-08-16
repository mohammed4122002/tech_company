"use client"
import React from 'react'
import styles from './page.module.css'
import { signIn } from 'next-auth/react'

import { useForm } from "react-hook-form";


type FormValues = {
  email: string;
  password: string;
};

  
const Login = () => {
  
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

   const onSubmit =async  (data: FormValues) => {
    console.log("Form Data:", data);
      signIn("credentials" , data)
   }
  return (
   
   
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
             
                 <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                 
                   <div className={styles.formGroup}>
                      <input
                       className={styles.input}
                       type="email"
                       id="email"
                       placeholder="Email"
                       {...register("email", {
                         required: "Email is required",
                         pattern: {
                           value: /\S+@\S+\.\S+/,
                           message: "Invalid email address"
                         }
                       })}
                     />
                     {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                   </div>
                   <div className={styles.formGroup}>
                        <input
                       className={styles.input}
                       type="password"
                       id="password"
                       placeholder="Password"
                       {...register("password", {
                         required: "Password is required",
                         minLength: { value: 6, message: "Minimum 6 characters" }
                       })}
                     />
                     {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                   </div>
                   <button className={styles.button} type="submit">
                     Login
                   </button>
                   <button  className={styles.button} onClick={()=>signIn("google")}>Login with google </button>
                 </form>
          
      
      </div>
 
  )
}

export default Login