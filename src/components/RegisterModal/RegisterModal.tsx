'use client';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/utils/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { setAuthModal, setRegisterModal } from '@/context/slices/userSlice';
import { IoMdClose } from 'react-icons/io';

import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import catRegister from '@/assets/cat-5.jpeg';
import LoginToGoogle from '../LoginToGoogle/LoginToGoogle';

const RegisterModal = () => {
  const dispatch = useAppDispatch();

  const { authModal } = useAppSelector((state) => state.user);

  console.log(authModal);

  return (
    <AnimatePresence>
      <div className="w-full h-full mt-[100px] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className="absolute top-[300px] left-[200px] z-0">
          <Image src={catRegister} width={400} height={300} className="rounded-3xl rotate-6" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="w-[600px] flex justify-center z-10  
            flex-col shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-2xl p-4">
          <div className="flex justify-end mb-4">
            <IoMdClose
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => {
                dispatch(setRegisterModal(false));
              }}
              size={20}
            />
          </div>
          <Card className="w-full" color="transparent" shadow={false}>
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Регистрация
              </Typography>
            </div>

            <form className="mt-8 mb-2  max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Ваш Email
                </Typography>
                <Input
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
                  color="blue"
                  className="mt-6 hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] transition"
                  fullWidth>
                  зарегистрироваться
                </Button>
                <Typography variant='h6' className='text-center '>
                  или
                </Typography>
                  <LoginToGoogle/>
              </div>
              <Typography color="gray" className="mt-4 text-center font-normal">
                У вас уже есть аккаунт?{' '}
                <p
                  onClick={() => {
                    dispatch(setAuthModal(true));
                  }}
                  className="font-medium text-gray-900 hover:text-red-500 inline-block transition cursor-pointer">
                  Авторизация
                </p>
              </Typography>
            </form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegisterModal;
