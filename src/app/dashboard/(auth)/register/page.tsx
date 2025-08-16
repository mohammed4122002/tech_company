"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  username: string;
  email: string;
  password: string;
};
const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

   const onSubmit =async  (data: FormValues) => {
    console.log("Form Data:", data);

    try {
const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data}),
    })
       console.log("Form Data:", data);

     if (res.status === 201) {
      router.push("/dashboard/login?success=Account has been created successfully");
   
     }


}catch (error) {
      console.error("Error during registration:", error);
    
    router.push("/dashboard/login?failure=Something went wrong, please try again later");
}
  };

  return (
    <div className={styles.container}>
      <h1>Register Page</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
           <input
            className={styles.input}
            type="text"
            id="username"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>
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
          Register
        </button>
      </form>
      <Link className={styles.link} href="/dashboard/login">
        login with an existing account
      </Link>
    </div>
  );
};

export default Register;
