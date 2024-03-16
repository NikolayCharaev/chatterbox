import { mongoStatus } from '@/utils/mongoStatus';
import type { NextAuthOptions } from 'next-auth'; // импортируем типы для аутентификации
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = await credentials;
        try {
          await mongoStatus();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }

          console.log(user);
          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },

  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user.id = sessionUser?._id?.toString();
      session.user.name = sessionUser?.username?.toString();
      return session;
    },
    async signIn({ user }) {
      try {
        await mongoStatus();
        const findUserInDb = await User.findOne({ email: user.email });

        if (!findUserInDb) {
          const newUser = await User.create({
            email: user.email,
            username: user.name,
            image: user.image,
          });
        }
      } catch (err) {
        throw new Error(err);
      }
      return true;
    },
    async signOut() {
      console.log('EXIT');
      return true;
    },
  },
};
