import mongoose, { Schema, models, model } from 'mongoose';

const ChatShema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const Chat = models.Chat || model('Chat', ChatShema);

export default Chat;
