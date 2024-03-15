import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer', '').trim();

  if (token) {
    try {
      const decoded = jwt.verify(token, 'bublik');
      req.userId = decoded._id;

      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Произошла ошибка.' + ' ' + err,
      });
    }
  } else {
    return res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
