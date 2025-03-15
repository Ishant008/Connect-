import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import notificationModal from "../models/notification.modal.js";
import imagekit from "../config/imageKit.js";
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) {
      return res.json({
        error: true,
        message: "Username is required",
      });
    }
    let user = await userModel.findOne({ username }).select("-password");
    if (!user) {
      return res.json({
        error: true,
        message: "User not exist",
      });
    }
    return res.status(200).json({
      error: false,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  const { username } = req.params;
  const { id } = req;
  const io = req.app.get("io")
  try {
    if (!username || !id) {
      return res.json({
        error: true,
        message: "All feilds are required",
      });
    }
    let followerUser = await userModel.findOne({ username });
    let followingUser = await userModel.findById(id);
    if (!followerUser || !followingUser) {
      return res.json({
        error: true,
        message: "User not exist",
      });
    }
    let isFollowing = followingUser.following.includes(followerUser._id);
    if (isFollowing) {
      let updatedUser = await userModel.findByIdAndUpdate(id, {
        $pull: {
          following: followerUser._id,
        },
      },{new:true},);
       await userModel.findByIdAndUpdate(followerUser._id, {
        $pull: {
          follower: followingUser._id,
        },
      });
      return res.status(200).json({
        error: false,
        message: "User Unfollowed succesfully",
        following:updatedUser.following,
      });
    } else {
      let updatedUser = await userModel.findByIdAndUpdate(id, {
        $push: {
          following: followerUser._id,
        },
      },
      {new:true},
    );
       await userModel.findByIdAndUpdate(followerUser._id, {
        $push: {
          follower: followingUser._id,
        },
      })
      let notification = new notificationModal({
        from: followingUser._id,
        to: followerUser._id,
        type: "follow",
      });
      await notification.save();
      io.emit("newNotification",({to:followerUser._id}))
      return res.status(200).json({
        error: false,
        message: "User Followed succesfully",
        following:updatedUser.following,
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

export const suggestions = async (req, res) => {
  try {
    const { id } = req;
    let usersFollwedByMe = await userModel.findById(id).select("following");
    let users = await userModel.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(id) },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    let suggestedUser;
    if (usersFollwedByMe.following.length > 0) {
      let filterUsers = users.filter(
        (user) => !usersFollwedByMe.following.includes(user._id)
      );
      suggestedUser = filterUsers.slice(0, 4);
    } else {
      suggestedUser = users.slice(0, 4);
    }
    suggestedUser.forEach((user) => (user.password = null));
    return res.status(200).json({
      error: false,
      suggestedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  const { id } = req;
  if (!id) {
    return res.json({
      error: true,
      message: "Token is required",
    });
  }
  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.json({
        error: true,
        message: "User not exist",
      });
    }
    user.password = undefined;
    return res.status(200).json({
      error: false,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  let {
    fullname,
    username,
    profileImg,
    coverImg,
    currPassword,
    newPassword,
    bio,
  } = req.body;
  const { id } = req;
  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.json({
        error: true,
        message: "User not exist",
      });
    }
    if (username == user.username) {
      username = "";
    } else if (username) {
      let existUsername = await userModel.findOne({ username });
      if (existUsername) {
        return res.json({
          error: true,
          message: "Username already taken please choose different",
        });
      }
    }
    if (currPassword || newPassword) {
      if (!currPassword || !newPassword) {
        return res.json({
          error: true,
          message: "Please provide current and new both passwords",
        });
      }
      if (newPassword.length < 6) {
        return res.json({
          error: true,
          message: "Password must have be atleast 6 characters",
        });
      }
      if (currPassword === newPassword) {
        return res.json({
          error: true,
          message: "Please choose a new password",
        });
      }
      const isMatch = await bcrypt.compare(currPassword, user.password);
      if (!isMatch) {
        return res.json({
          error: true,
          message: "Current password is wrong",
        });
      }
      let hashPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashPassword;
    }
    async function uploadImage(imageBuffer) {
      let response = await imagekit.upload({
        file: imageBuffer, 
        fileName: `profile_${Date.now()}`
      });

      return response;
    }

    if (profileImg) {
      if (user.profileImg && user.profileID) { 
        await imagekit.deleteFile(user.profileID); 
      }
      let response = await uploadImage(profileImg); 
      user.profileImg = response.url
      user.profileID = response.fileId
  }
  if (coverImg) {
      if (user.coverImg && user.coverID) {
        await imagekit.deleteFile(user.coverID);  
      }
      let response = await uploadImage(coverImg)
      user.coverImg = response.url; 
      user.coverID = response.fileId;
  }
    user.fullname = fullname || user.fullname;
    user.bio = bio || user.bio;
    user.username = username || user.username;
    await user.save();
    return res.status(200).json({
      error: false,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const deleteImg = async (req, res) => {
  const { id } = req;
  const { img } = req.body;

  try {
    let user = await userModel.findById(id);
    if (!user) {
      return res.json({
        error: true,
        message: "User not exist",
      });
    }
    if (img == "profileImg") {
      if (user.profileImg && user.profileID) { 
        await imagekit.deleteFile(user.profileID); 
        user.profileImg = undefined;
        user.profileID = undefined;
      }
    } else if (img == "coverImg") {
      if (user.coverImg && user.coverID) {
        await imagekit.deleteFile(user.coverID); 
        user.coverImg = undefined;
        user.coverID = undefined;
      }
    }
    await user.save();
    res.json({
      error: false,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Some Internal Error",
      err: error.message,
    });
  }
};

export const search = async (req,res)=>{
  const { text } = req.body
  if(!text){
    return res.json({
      error:true,
      message:"Text is required"
    })
  }
  try {
    let users = await userModel.find({
      $or: [
        { username: { $regex: text, $options: "i" } },
        { fullname: { $regex: text, $options: "i" } }
      ]
    }).select("username fullname profileImg")
      return res.json({
        error:false,
        users,
      })
  } catch (error) {
    return res.json({
      error:true,
      err:error
    })
  }
}
