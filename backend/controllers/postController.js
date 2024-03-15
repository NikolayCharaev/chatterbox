import Post from '../models/post.js';

//Создание статьи
export const create = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user: req.userId,
    });

    return res.status(200).json(newPost);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось создать статью.' + ' ' + err,
    });
  }
};

// Удаление статьи
export const remove = async (req, res) => {
  try {
    const onePost = req.params.id;

    const removePost = await Post.findOneAndDelete({ _id: onePost.replaceAll(':', '') });
    if (!removePost) {
      return res.status(404).json({
        message: 'статья не найдена',
      });
    }
    return res.status(200).json({
      message: 'Статья успешно удалена',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось удалить статью.' + ' ' + err,
    });
  }
};

// Получение всех статей
export const getAll = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate('user').exec();

    if (!allPosts) {
      return res.status(404).json({
        message: 'статья не найдена',
      });
    }

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить статьи.' + ' ' + err,
    });
  }
};

// Получение одной статьи
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const onePost = await Post.findOne({ _id: postId });

    if (!onePost) {
      return res.status(404).json({
        message: 'статья не найдена',
      });
    }

    return res.status(200).json({onePost})
  } catch (err) {
    return res.status(500).json({
      message: 'Не удалось получить статьи.' + ' ' + err,
    });
  }
};
