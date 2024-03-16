import { NextResponse } from 'next/server';

import User from '@/models/user';
import { mongoStatus } from '@/utils/mongoStatus';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await mongoStatus();
    const existingUser = await User.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!existingUser || !passwordMatch) {
      return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 500 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
