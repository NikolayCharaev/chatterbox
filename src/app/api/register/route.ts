import { NextResponse } from 'next/server';

import mongoose from 'mongoose';
import User from '@/models/user';
import { mongoStatus } from '@/utils/mongoStatus';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await mongoStatus();

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json({ message: 'Выберите другой email' }, { status: 500 });
    }
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
