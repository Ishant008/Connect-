import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../config/Axios";
import { userAction } from "../../store/userSlice";

const FollowBTN = ({ username, id, className }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user && user.following) {
      setIsFollowing(user.following.includes(id));
    }
  }, [user, id]);

  const handleFollow = async () => {
    try {
      let res = await Axios.put(`/user/follow/${username}`);
      if (!res.data.error && res.data.following) {
        setIsFollowing(res.data.following.includes(id)); 
        dispatch(userAction.getMe({ ...user, following: res.data.following }));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`${className} w-fit font-btn font-semibold ${
        isFollowing ? "bg-red-500 text-white" : "bg-gray-700 text-white"
      } dark:bg-white dark:text-black rounded-full py-1 cursor-pointer`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowBTN;
