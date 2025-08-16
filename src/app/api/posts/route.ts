import Post from '@/models/Post';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';
export const GET = async (request: Request) => {
    try {
       await connect();
       const posts = await Post.find();
       return NextResponse.json(posts, { status: 200 });
    }
    catch (error) {
       
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
