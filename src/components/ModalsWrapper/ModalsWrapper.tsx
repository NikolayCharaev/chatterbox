'use client';
import React from 'react';
import { useAppSelector } from '@/utils/hooks';
import AuthModal from '../AuthModal/AuthModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { motion, AnimatePresence } from 'framer-motion';
const ModalsWrapper = () => {
  const { authModal, registerModal } = useAppSelector((state) => state.user);

  return (
    <>
      {authModal && <AuthModal />}
      {registerModal && <RegisterModal />}
    </>
  );
};

export default ModalsWrapper;
