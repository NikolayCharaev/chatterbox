'use client';
import React from 'react';
import { useAppSelector } from '@/utils/hooks';
import AuthModal from '../AuthModal/index';
import RegisterModal from '../RegisterModal/index';





const ModalsWrapper = () => {

  const { authModal, registerModal } = useAppSelector((state) => state.user);




  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      {authModal && <AuthModal />}
      {registerModal && <RegisterModal />}
    </div>
  );
};

export default ModalsWrapper;
