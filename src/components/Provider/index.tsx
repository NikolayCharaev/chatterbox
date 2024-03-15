'use client';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/context/store';


const Provider = ({ children }) => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ReduxProvider store={store}>
          <div>{children}</div>
        </ReduxProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
