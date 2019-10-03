const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort('-title');
    res.status(201).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
};

exports.createPost = async (req, res, next) => {
  const { title, description } = req.body;
  const newPost = new Post({
    title,
    description,
    author: req.user,
  });
  try {
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
};
