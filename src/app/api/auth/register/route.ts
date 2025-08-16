import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    
    await connect();

    // تحقق من وجود المستخدم مسبقاً
    const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log("New User Data:", newUser);
    

    await newUser.save();

    return new NextResponse(JSON.stringify({ message: "User registered successfully" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Registration failed" }), {
      status: 500,
    });
  }
};
