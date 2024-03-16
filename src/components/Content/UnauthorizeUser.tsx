import React from 'react';

import noAuthCat from '@/assets/no-auth.jpeg';
import Image from 'next/image';
import { useAppDispatch } from '@/utils/hooks';
import { setAuthModal } from '@/context/slices/userSlice';
const UnauthorizeUser = () => {
    const dispatch= useAppDispatch()
    
  return (
    <div className="flex justify-center items-center gap-5">
      <div className="rounded-sm ">
        <Image className=" rounded-xl" src={noAuthCat} alt="no-auth-cat" width={600} height={600} />
      </div>
      <div className="text-uppercase w-52">
        <p>Для того чтобы использовать чат, необходимо выполнить процесс <span className='cursor-pointer text-red-500 '  onClick={() => dispatch(setAuthModal(true))}>аутентификации</span>.</p>
      </div>
    </div>
  );
};

export default UnauthorizeUser;
