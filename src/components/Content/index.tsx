'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import UnauthorizeUser from './UnauthorizeUser';
import AuthorizeUser from './AuthorizeUser';
const Content = () => {
  const { data: session } = useSession();
  return <div>{!session ? <UnauthorizeUser /> : <AuthorizeUser />}</div>;
};

export default Content;
