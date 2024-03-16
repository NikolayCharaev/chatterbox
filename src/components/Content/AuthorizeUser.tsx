'use client';
import { SetStateAction, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import NewChatModal from '../NewChatModal/index';

const AuthorizeUser = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-center mb-4">Приятного общения</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setModalActive(true)} color="blue">
            Создать чат
          </Button>
        </div>
      </div>

      <div className="w-full relative h-[750px] shadow-[5px_5px_0px_0px_rgba(109,40,217)] mb-[100px] rounded-xl flex justify-between  overflow-hidden">
        <div className="w-1/4 bg-[#221831] p-4 flex flex-col overflow-scroll"></div>
        <div className="w-3/4 p-4 bg-[#ce9fe4] flex flex-col overflow-scroll">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eligendi asperiores,
          odit optio porro nam molestiae repellat, sapiente iusto, maiores explicabo commodi?
          Architecto minima eaque laborum alias, harum cupiditate placeat?
        </div>

        <AnimatePresence>
          {modalActive && (
            <NewChatModal setModalActive={setModalActive}/>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AuthorizeUser;
