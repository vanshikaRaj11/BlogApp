const httpStatus = require("http-status");
const Like = require("../models/like.model");
const Post = require("../models/post.model");

exports.likePost = async (req, res) => {
  try {
    const { postId, user } = req.body;

    const like = new Like({
      postId,
      user,
    });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: savedLike._id,
        },
      },
      { new: true }
      ).populate("likes");
      res.status(httpStatus.OK).send({
          data: updatedPost,
          code: 200,
          message:"You liked this post"
      })
  } catch (error) {
      return res.status(500).json({
        error: "Error in liking post",
      });
  }
};

exports.unlikePost = async (req, res) => {
     try {
       const { postId, like } = req.body;


       const deletedLike = await Like.findOneAndDelete({postId:postId, _id:like});

       const updatedPost = await Post.findByIdAndUpdate(
         postId,
         {
           $pull: {
             likes: deletedLike._id,
           },
         },
         { new: true }
       );
       res.status(httpStatus.OK).send({
         data: updatedPost,
         code: 200,
         message: "You liked this post",
       });
     } catch (error) {
       return res.status(500).json({
         error: "Error in unliking post",
       });
     }
}