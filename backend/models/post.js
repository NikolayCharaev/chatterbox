import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const PostShema = new Schema({
  title: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Post = models.Post || model('Post', PostShema);

export default Post;
