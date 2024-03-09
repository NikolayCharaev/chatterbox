import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

import catGoogle from '@/assets/cat-google.jpeg';
const LoginToGoogle = () => {
  return (
    <div
      onClick={() => {
        signIn('google');
      }}
      className="relative cursor-pointer hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition">
      <Image width={400} height={60} src={catGoogle} alt="войти через google" />
      <p className="absolute inset-0 flex justify-center items-center text-white">
        войти через google
      </p>
    </div>
  );
};

export default LoginToGoogle;
