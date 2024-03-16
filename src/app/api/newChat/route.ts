import { mongoStatus } from '@/utils/mongoStatus';
import Chat from '@/models/chat';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  await mongoStatus();
  try {
    const { user, title, messages} = await req.json();

    const existingChat = await Chat.findOne({ title : title });

    console.log(existingChat)

    if (existingChat) {
      return NextResponse.json({ message: 'Такое название чата уже есть' }, { status: 500 });
    } else {
      const newChat = await Chat.create({
        user : user.id,
        title,
        messages
      });

      return NextResponse.json(newChat, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
};
