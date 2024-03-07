'use client';
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/context/store';

const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
};

export default Provider;
