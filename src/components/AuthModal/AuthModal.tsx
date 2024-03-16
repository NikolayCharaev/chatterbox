'use client';
import { useState } from 'react';
import { useAppDispatch } from '@/utils/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { setAuthModal, setRegisterModal } from '@/context/slices/userSlice';
import { IoMdClose } from 'react-icons/io';
import { signIn } from 'next-auth/react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

import Image from 'next/image';
import catAuth from '@/assets/cat-4.jpeg';

import LoginToGoogle from '../LoginToGoogle/LoginToGoogle';

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Все поля обязательны для заполнения');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

   
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('Произошла ошибка авторизации.' + res.error);

        return setTimeout(() => {
          setError('');
        }, 3000);
      }

      if(res.ok) { 
        dispatch(setAuthModal(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        className="mt-[100px] flex gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className="">
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
          className="w-full max-w-[900px]  flex justify-center z-10 bg-white  
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
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white bg-red-500 w-max px-4 py-2 rounded-xl text-lg mt-4">
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

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
                У вас нет аккаунта?
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
