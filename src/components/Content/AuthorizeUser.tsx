'use client';
import { SetStateAction, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const AuthorizeUser = () => {
  const [modalActive, setModalActive] = useState<boolean>(false);
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
    } catch (err) {}
  }
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
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setChatName(e.target.value)
                }
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
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AuthorizeUser;
