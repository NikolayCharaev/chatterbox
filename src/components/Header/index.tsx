'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cat from '@/assets/cat-1.jpeg';
import catLogin from '@/assets/cat-2.jpeg';
import catLogout from '@/assets/cat-3.jpeg';
import { useDarkMode } from 'usehooks-ts';

import { CiLight, CiDark } from 'react-icons/ci';

import { setAuthModal } from '@/context/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Tooltip } from '@material-tailwind/react';

const Header = () => {
  const { toggle } = useDarkMode();

  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useAppDispatch();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Проверяем значение в localStorage
    const storedMode = localStorage.getItem('usehooks-ts-dark-mode');
    return storedMode ? JSON.parse(storedMode) : false;
  });

  // Обновляем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('usehooks-ts-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Обработчик для кнопки переключения темы
  const handleToggle = () => {
    toggle();
    setIsDarkMode(!isDarkMode);
  };

  // Применяем тему к body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-2xl shadow-blue-500/20 py-4">
      <div className="container flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-4 hover:text-red-500 transition">
          <Image src={cat} alt="котик" width={100} height={100} className="rounded-xl" />
          <h1 className="font-bold ">ChatterBox</h1>
        </Link>

        <div className="flex gap-4 items-center">
          <div onClick={handleToggle} className="cursor-pointer">
            {isDarkMode ? <CiLight size={30} /> : <CiDark size={30} />}
          </div>
          {session?.user ? (
            <div className="flex gap-4 items-center">
              <Tooltip className="bg-blue-600" content={session?.user.name}>
                <Image
                  className="object-cover rounded-2xl"
                  src={session?.user?.image || catLogin}
                  width={80}
                  height={80}
                  alt="user-image"
                />
              </Tooltip>
              <Button
                className="flex gap-2 items-center px-4 py-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => {
                  signOut();
                  window.localStorage.removeItem('user');
                }}>
                Выйти
              </Button>
            </div>
          ) : localUser ? (
            <div className="flex gap-4 items-center">
              <Tooltip className="bg-blue-600" content={localUser.username}>
                <Image
                  className="object-cover rounded-2xl"
                  src={catLogout}
                  width={80}
                  height={80}
                  alt="user-image"
                />
              </Tooltip>
              <Button
                className="flex gap-2 items-center px-4 py-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => {
                  // Действия для выхода из аккаунта, если это нужно

                  window.localStorage.removeItem('user');
                  signOut();
                }}>
                Выйти
              </Button>
            </div>
          ) : (
            <Tooltip className="bg-blue-600" placement="right-start" content="Войти">
              <button
                className="m-4 w-24 h-16 gap-2"
                onClick={() => {
                  dispatch(setAuthModal(true));
                }}>
                <Image
                  className="object-cover rounded-2xl w-full h-full"
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
