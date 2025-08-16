import Post from '@/models/Post';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

// GET post by ID
export const GET = async (
  request: Request,
  { params }: { params: { _id: string } }
) => {
  try {
    // الاتصال بقاعدة البيانات
    await connect();

    // جلب البوست بناءً على ID
    const post = await Post.findById(params._id);

    // التحقق إذا لم يتم العثور على البوست
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // إرجاع البوست إذا وُجد
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch the post' },
      { status: 500 }
    );
  }
};
