'use client';
import { useState } from 'react';
import { useAppDispatch } from '@/utils/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAuthUser, setAuthModal, setRegisterModal } from '@/context/slices/userSlice';
import { IoMdClose } from 'react-icons/io';

import { Card, Input, Button, Typography } from '@material-tailwind/react';

import Image from 'next/image';
import catAuth from '@/assets/cat-4.jpeg';

import LoginToGoogle from '../LoginToGoogle/LoginToGoogle';

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authUser = {
      password,
      email,
    };

    try {
      dispatch(fetchAuthUser(authUser)).then((res) => {
        if (res.type !== 'authUser/rejected') {
          window.localStorage.setItem('user', JSON.stringify(res.payload));
          window.location.reload();
        } else {
          alert(res.error.message);
        }
      });
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        className="w-full h-full mt-[100px]  flex justify-center gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className="absolute top-[300px] left-[200px] z-0">
          <Image
            src={catAuth}
            alt="войти"
            width={400}
            height={300}
            className="rounded-3xl rotate-6"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="w-[600px] flex justify-center z-10 bg-white  
            flex-col shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-2xl p-4">
          <div className="flex justify-end mb-4">
            <IoMdClose
              className="cursor-pointer hover:text-red-500 transition text-black"
              onClick={() => {
                dispatch(setAuthModal(false));
              }}
              size={20}
            />
          </div>
          <Card className="w-full" color="white" shadow={false}>
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Авторизация
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Ваш Email
                </Typography>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Пароль
                </Typography>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button
                  type="submit"
                  color="blue"
                  className="mt-6 hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] transition"
                  fullWidth>
                  войти
                </Button>
                <Typography variant="h6" className="text-center ">
                  или
                </Typography>
                <LoginToGoogle />
              </div>
              <Typography color="gray" className="mt-4 text-center font-normal">
                У вас нет аккаунта?{' '}
                <span
                  onClick={() => {
                    dispatch(setRegisterModal(true));
                  }}
                  className="font-medium text-gray-900 hover:text-red-500 inline-block transition cursor-pointer">
                  Регистрация
                </span>
              </Typography>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
