import { mongoStatus } from '@/utils/mongoStatus';
import type { NextAuthOptions } from 'next-auth'; // импортируем типы для аутентификации
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      //@ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      //@ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user.id = sessionUser?._id?.toString();
      return session;
    },
    async signIn({ user }) {
      try {
        await mongoStatus();
        const findUserInDb = await User.findOne({ email: user.email });
        // localStorage.setItem('person', JSON.stringify(user))

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
