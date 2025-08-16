import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

 const handler =NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? (() => { throw new Error("GOOGLE_ID is not set"); })(),
      clientSecret: process.env.GOOGLE_SECRET ?? (() => { throw new Error("GOOGLE_SECRET is not set"); })(),
    }),
     CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connect();
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }
        try {
          const user = await User.findOne({ email: credentials.email }).exec();
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("User Not Found");
            }
          } else {
            throw new Error("User Not Found");
          }
        } catch (err) {
          throw new Error(typeof err === "string" ? err : "Authentication error");
        }
      }
     })
    // ...add more providers here
  ],
  pages : {
    error : "/dashboard/login"
  }
})

export {handler as GET, handler as POST}