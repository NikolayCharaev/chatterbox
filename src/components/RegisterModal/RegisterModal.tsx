'use client';
import { SetStateAction, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/utils/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAuthUser, setAuthModal, setRegisterModal } from '@/context/slices/userSlice';
import { IoMdClose } from 'react-icons/io';

import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import catRegister from '@/assets/cat-5.jpeg';
import LoginToGoogle from '../LoginToGoogle/LoginToGoogle';

const RegisterModal = () => {
  const { user, registerStatus } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !username) {
      setError('Все поля обязательны для заполнения');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      const res = await fetch('api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message); // Отображаем сообщение об ошибке сервера пользователю

        setTimeout(() => {
          setError('');
        }, 3000);
      }else{ 
        alert('Регистрация прошла успешно')
        dispatch(setRegisterModal(false))
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (registerStatus == 'success') {
  //     dispatch(fetchAuthUser({ email, password }));
  //   }
  // }, [registerStatus]);

  return (
    <AnimatePresence>
      <div className="w-full h-full mt-[100px] mb-[100px] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          className="absolute top-[300px] left-[200px] z-0">
          <Image
            alt="регистрация"
            src={catRegister}
            width={400}
            height={300}
            className="rounded-3xl rotate-6"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="w-[600px] flex justify-center z-10  bg-white  
            flex-col shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-2xl p-4">
          <div className="flex justify-end mb-4">
            <IoMdClose
              className="cursor-pointer hover:text-red-500 transition text-black"
              onClick={() => {
                dispatch(setRegisterModal(false));
              }}
              size={20}
            />
          </div>
          <Card className="w-full" color="white" shadow={false}>
            <div className="flex justify-between items-center">
              <Typography variant="h4" color="blue-gray">
                Регистрация
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Ваше Имя
                </Typography>
                <Input
                  value={username}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setUserName(e.target.value)
                  }
                  size="lg"
                  placeholder="Введите имя или никнейм"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Ваш Email
                </Typography>
                <Input
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setEmail(e.target.value)
                  }
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
                  onChange={(e: { target: { value: SetStateAction<string> } }) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                />
              </div>
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
              <div className="flex flex-col items-center gap-1">
                <Button
                  color="blue"
                  type="submit"
                  className="mt-6 hover:shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] transition"
                  fullWidth>
                  зарегистрироваться
                </Button>
                <Typography variant="h6" className="text-center ">
                  или
                </Typography>
                <LoginToGoogle />
              </div>
              <Typography color="gray" className="mt-4 text-center font-normal">
                У вас уже есть аккаунт?
                <span
                  onClick={() => {
                    dispatch(setAuthModal(true));
                  }}
                  className="font-medium text-gray-900 hover:text-red-500 inline-block transition cursor-pointer">
                  Авторизация
                </span>
              </Typography>
            </form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegisterModal;
