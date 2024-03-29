import mongoose, { Schema, models, model } from 'mongoose';

const UserShema = new Schema({
  email: {
    type: String,
    unique: [true, 'попробуйте другой email'],
    required: [true, 'поле обязательно для заполнения'],
  },
  username: {
    type: String,
    required: [true, 'поле обязательно для заполнения'],
  },
  password: {
    type: String,
    // required: [true, 'поле обязательно для заполнения'],
  },
  image : { 
    type: String
  }
});

const User = models.User || model('User', UserShema);

export default User;
