const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const httpStatus = require("http-status")

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    const comment = new Comment({
      post,
      user,
      body,
    });

    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
      ).populate("comments").exec();
      
      res.send(httpStatus.OK,{
          data: updatedPost,
          code: 200,
          message:"Comment added successfully"
      })
  } catch (error) {
      return res.status(500).json({
          error:"Error in creating comment"
      })
  }
};
