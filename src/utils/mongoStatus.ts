import mongoose from 'mongoose';

let isConnected = false;

export const mongoStatus = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Подключение успешно');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || '', {
      dbName: 'chatterbox',

      //@ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Подключение успешно');
  } catch (err) {
    console.log(err);
  }
};
