'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cat from '@/assets/cat-1.jpeg';
import catLogin from '@/assets/cat-2.jpeg';
import catLogout from '@/assets/cat-3.jpeg';

import { setAuthModal } from '@/context/slices/userSlice';
import { useAppDispatch } from '@/utils/hooks';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Tooltip } from '@material-tailwind/react';

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-2xl shadow-blue-500/20 py-4">
      <div className="container flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-4 hover:text-red-500 transition">
          <Image src={cat} width={100} height={100} className="rounded-xl" />
          <h1 className="font-bold ">ChatterBox</h1>
        </Link>

        <div className="flex gap-4">
          {session?.user ? (
            <div className="flex gap-4 items-center">
              <Tooltip className="bg-blue-600" content={session?.user.name}>
                <Image
                  className="object-cover rounded-2xl "
                  src={session.user.image}
                  width={80}
                  height={80}
                  alt="user-image"
                />
              </Tooltip>
              <Button
                className="flex gap-2 items-center px-4 py-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => signOut()}>
                Выйти
              </Button>
            </div>
          ) : (
            <Tooltip className='bg-blue-600' placement="right-start" content="Войти">
              <button
                className="m-4 w-24 h-16 gap-2"
                onClick={() => {
                  dispatch(setAuthModal(true));
                }}>
                <Image
                  className="object-cover rounded-2xl w-full h-full "
                  src={catLogin}
                  alt="login"
                  width={100}
                  height={100}
                />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
