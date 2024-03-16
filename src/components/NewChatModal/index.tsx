import React from 'react';
import { SetStateAction, useState, useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useSession } from 'next-auth/react';

const NewChatModal = ({ setModalActive }) => {
  const { data: session } = useSession();
  const [chatName, setChatName] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!chatName) {
      setError('введите название');

      return setTimeout(() => {
        setError('');
      }, 2000);
    }
    try {
      const res = await fetch('/api/newChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: chatName,
          user: session.user,
        }),
      });

      if (res.ok) {
        alert('Новый чат создан');
        setModalActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setModalActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px]  bg-white px-6 py-4 rounded-xl text-black flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between">
        <h1 className="text-center">Новый чат</h1>
        <button
          type="button"
          onClick={() => setModalActive(false)}
          className="hover:text-red-500 transition">
          <IoMdClose size={20} />
        </button>
      </div>

      <Input
        value={chatName}
        onChange={(e: { target: { value: SetStateAction<string> } }) => setChatName(e.target.value)}
        className="text-xl "
        color="blue"
        label="название чата"
      />

      <Button type="submit" color="blue">
        Создать
      </Button>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-lg text-white px-2 bg-red-500 rounded-md">
          {error}
        </motion.p>
      )}
    </motion.form>
  );
};

export default NewChatModal;
