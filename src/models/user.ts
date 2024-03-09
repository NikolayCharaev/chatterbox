import mongoose, { Schema, models, model } from 'mongoose';

const UserShema = new Schema({
  email: {
    type: String,
    unique: [true, 'такой email занят'],
    required: [true, 'поле обязательно для заполнения'],
  },
  username: {
    type: String,
    required: [true, 'поле обязательно для заполнения'],
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserShema);

export default User;
