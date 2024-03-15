import mongoose from 'mongoose';
export const mongoStatus = async () => {
    let isConnected = false;
    mongoose.set('strictQuery', true);
    if (isConnected) {
      console.log('Подключение успешно');
      return;
    }
    try {
      await mongoose.connect(
        'mongodb+srv://admin:wwwwww@cluster0.m6dkocn.mongodb.net/?retryWrites=true&w=majority' || '',
        {
          dbName: 'chatterbox',
        },
      );
      isConnected = true;
      console.log('Подключение успешно');
    } catch (err) {
      console.log(err);
    }
  };