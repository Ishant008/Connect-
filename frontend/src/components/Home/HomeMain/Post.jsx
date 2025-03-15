import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "../../../config/Axios";
import { ContextStore } from "../../../contextStore/ContextStore";
import { useContext, useState } from "react";
import { ClockLoader } from "react-spinners";
import { NavLink, useLocation } from "react-router";
import PostBottom from "./PostBottom";

const Post = ({ post }) => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const { setPosts } = useContext(ContextStore);
  const [loading, setLoading] = useState(false);
  const deletPost = (postID) => {
    setLoading(true);
    Axios.delete(`/post/delete-post/${postID}`).then((res) => {
      if (!res.data.error) {
        setLoading(false);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id != postID));
      }
    });
  };
  return (
    <div className="h-fit flex gap-2 p-2 border-b-[1px] border-black dark:border-gray-700">
      <img
        className="w-10 h-10 object-cover rounded-full "
        src={post.user.profileImg ? post.user.profileImg : "/img/profile.jpg"}
        alt="profile"
      />
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className=" flex gap-2 justify-between items-center">
          <NavLink
            to={
              location.pathname != `/profile/${post.user.username}` &&
              `/profile/${post.user.username}`
            }
          >
            <h6 className="font-semibold">{post.user.fullname}</h6>
            <p className="font-light text-sm text-black dark:text-white/60">
              @{post.user.username}
            </p>
          </NavLink>
          {user._id == post.user._id && (
            <button
              disabled={loading}
              onClick={() => {
                deletPost(post._id);
              }}
            >
              {loading ? (
                <ClockLoader color="#178746" size={20} />
              ) : (
                <MdDelete size={26} className="cursor-pointer" />
              )}
            </button>
          )}
        </div>
        {post.text && <div>{post.text}</div>}
        {post.img && (
          <div className="w-full">
            <img
              className="max-w-full max-h-70 md:max-h-100 border-[1px] rounded border-black dark:border-gray-700"
              src={post.img}
              alt="post"
            />
          </div>
        )}
        <PostBottom user={user._id} id={post._id} likes={post.likes} comments={post.comments} />
      </div>
    </div>
  );
};

export default Post;
