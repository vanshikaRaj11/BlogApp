const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const httpStatus = require("http-status")

exports.createComment = async (req, res) => {
  try {
    const { postId, user, body } = req.body;

    const comment = new Comment({
      postId,
      user,
      body,
    });

    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec();
      
      res.status(httpStatus.OK).send({
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
