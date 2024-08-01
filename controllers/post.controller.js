const Post = require("../models/post.model");
const httpStatus = require("http-status");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();

    res.status(httpStatus.OK).send({
      data: savedPost,
      code: 200,
      message: "Post added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error in creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments")
          .exec();
      
      console.log("Posts",posts);
    res.status(httpStatus.OK).send({
      data: posts,
      code: 200,
      message: "Posts data",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error in fetching post",
    });
  }
};
