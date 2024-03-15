import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    // Создаем нового пользователя
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
      // image: imageUrl, // Исправлено на image
    });

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      'bublik',
      {
        expiresIn: '30d',
      },
    );
    // Удаляем хеш пароля из данных пользователя
    const { password: _, ...userData } = newUser._doc;
    // Возвращаем данные пользователя и токен в ответе
    return res.status(200).json({
      ...userData,
      token,
    });
  } catch (error) {
    // Обработка ошибки, если возникла
    console.error('Ошибка при создании пользователя:', error);
    return res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
};

export const getMe = async (req, res) => {
  try {
    const myUser = await User.findById(req.userId);

    if (!myUser) {
      return res.status(404).json({
        message: 'Пользователь не найден :(',
      });
    }
    return res.status(200).json({
      myUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Не удалось получить информацию о пользователе` + ' ' + err,
    });
  }
};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // если такого пользователя  нет
      return res.status(404).json({
        message: `Пользователь не найден`,
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      // если пароль неверный
      return res.status(404).json({
        message: `Неверный email или пароль`,
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      'bublik',
      {
        expiresIn: '30d',
      },
    );
    // Удаляем хеш пароля из данных пользователя
    const { password: _, ...userData } = user._doc;
    // Возвращаем данные пользователя и токен в ответе
    return res.status(200).json({
      ...userData,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Ошибка авторизации. ${err}`,
    });
  }
}