import notificationModal from "../models/notification.modal.js";
import postModel from "../models/post.model.js";
import imagekit from "../config/imageKit.js";

export const createPost = async (req, res) => {
  let { text, img } = req.body;
  let imgID;
  const { id } = req;
  try {
    if (img) {
      let response = await imagekit.upload({
        file: img,
        fileName: `post_${Date.now()}`,
      });
      img = response.url;
      imgID = response.fileId;
    }
    let post = new postModel({
      user: id,
      text,
      img,
      imgID,
    });
    await post.save();
    post = await postModel.findById(post._id).populate({
      path: "user",
      select: "-password",
    });
    return res.status(200).json({
      error: false,
      message: "post uploaded succesfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req;
  const { postID } = req.params;
  if (!postID) {
    return res.json({
      error: true,
      message: "Invalid post id",
    });
  }
  try {
    let post = await postModel.findById(postID);
    if (!post) {
      return res.json({
        error: true,
        message: "Post not exist",
      });
    }
    if (post.user == id) {
      await postModel.findByIdAndDelete(postID);
      if (post.img && post.imgID) {
        await imagekit.deleteFile(post.imgID);
      }
      return res.status(200).json({
        error: false,
        message: "Post deleted successfully",
      });
    }
    return res.json({
      error: true,
      message: "You are not authorized to delete this post",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  const { id } = req;
  const { postID } = req.params;
  const { text } = req.body;
  const io = req.app.get("io");
  try {
    let post = await postModel.findById(postID);
    if (!post) {
      return res.json({
        error: true,
        message: "Post does not Exist",
      });
    }
    post.comments.push({
      text,
      user: id,
    });
    await post.save();
    if (id != post.user) {
      let notification = new notificationModal({
        from: id,
        to: post.user,
        type: "comment",
      });
      await notification.save();
      io.emit("newNotification",({to:post.user}))
    }
    await post.populate({
      path:"comments.user",
      select:"profileImg username fullname"
    });

    io.emit("postComment", { postID: post._id, comment: post.comments });
    return res.status(200).json({
      error: false,
      message: "Comment added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const likeUnlike = async (req, res) => {
  const { id } = req;
  const { postID } = req.params;
  try {
    if (!postID) {
      return res.json({
        error: true,
        message: "Post id is required",
      });
    }
    let post = await postModel.findById(postID);
    const io = req.app.get("io");
    let postLiked = post.likes.includes(id);
    if (postLiked) {
      post.likes.pull(id);
      await notificationModal.deleteOne({
        from: id,
        to: post.user,
        type: "like",
      });
      await post.save();
      io.emit("postLike", { postID: post._id, userID: id });
      return res.status(200).json({
        error: false,
        message: "Post has been unliked",
      });
    } else {
      post.likes.push(id);
      if (post.user != id) {
        let notification = new notificationModal({
          from: id,
          to: post.user,
          type: "like",
        });
        await notification.save();
        io.emit("newNotification",({to:post.user}))
      }
      await post.save();
      io.emit("postLike", { postID: post._id, userID: id });
      return res.status(200).json({
        error: false,
        message: "Post has been liked",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "fullname username profileImg",
      });
    return res.status(200).json({
      error: false,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  const { userID } = req.params;
  try {
    if (!userID) {
      return res.json({
        error: true,
        message: "userID is required",
      });
    }
    let posts = await postModel
      .find({ user: userID })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "user",
          select: "-password",
        },
        {
          path: "comments.user",
          select: "username fullname profileImg",
        },
      ]);
    return res.status(200).json({
      error: false,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};
