import mongoose, { Schema, models, model } from 'mongoose';

const MessageShema = new Schema({
    
});

const Message = models.Message || model('Message', MessageShema);

export default Message;
