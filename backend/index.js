import express from 'express';
import { mongoStatus } from './utils/mongoStatus.js';
import checkAuth from './utils/checkAuth.js';
import cors from 'cors';

import { getMe, login, register } from './controllers/userController.js';
import { create, getAll, remove, getOne } from './controllers/postController.js';
const app = express();
app.use(express.json());
app.use(cors());
mongoStatus();

// Авторизация пользователя
app.post('/auth/login', login);

// Регистрация пользователя
app.post('/auth/register', register);

// Информация о пользователе
app.get('/auth/me', checkAuth, getMe);

// Добавление нового поста
app.post('/post', checkAuth, create);
// Удаление поста
app.delete('/post/:id', checkAuth, remove);
// Получение статей
app.get('/post', getAll);

//Получение одной статьи
app.get('/post/:id', getOne);

app.listen(4444, () => {
  console.log('SERVER connected');
});
