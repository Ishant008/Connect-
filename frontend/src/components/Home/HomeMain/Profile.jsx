import { NavLink, useNavigate } from "react-router";
import FollowBTN from "../../Buttons/FollowBTN";
import { useSelector } from "react-redux";
import Axios from "../../../config/Axios";

const Profile = ({ user }) => {
  const user1 = useSelector(store=>store.user)
  const nav = useNavigate()
  const logOut=async()=>{
    let response = await Axios.get('/auth/logout')
    if(response.data && !response.data.error){
      nav('/login')
    }
  }
  return (
    <div className="mt-[50px] pb-3 relative border-b-[1px] border-black dark:border-gray-700">
      <div className="w-full h-50 relative bg-gray-400 dark:bg-white flex justify-center">
        {user.coverImg && (
            <img
              className="h-50 w-full object-cover"
              src={user.coverImg && user.coverImg}
              alt="cover"
            />
          )}</div>
      <div className="absolute top-34 left-5 bg-white rounded-full dark:bg-black p-0.5">
        <img
          className="w-28 h-28 object-cover rounded-full "
          src={user.profileImg ? user.profileImg : "/img/profile.jpg"}
          alt=""
        />
      </div>
      <div className="w-full flex justify-end pr-3 mt-2">
        {user.username == user1.username ? (
          <NavLink to={`/edit-profile/${user1.username}`} className="px-3 py-1 rounded-full h-8 border-[1px] border-black dark:border-white cursor-pointer text-center">
            Edit profile
          </NavLink>
        ) : (
          <FollowBTN className="px-3 text-lg" username={user.username} id={user._id} />
        )}
      </div>
      <div className="flex justify-center md:hidden">
        <button onClick={logOut} className="py-1 px-2 rounded cursor-pointer border-[1px] border-black dark:border-white">Logout</button>
      </div>
      <div className="w-full flex flex-col mt-6 mx-4">
        <h3 className="text-2xl font-semibold">{user.fullname}</h3>
        <h6 className="text-lg font-light dark:text-white/70">
          {user.username}
        </h6>
        <p className="text-lg mt-3">{user.bio}</p>
        <div className="mt-3 flex gap-3 font-bold text-lg">
          <p>
            {user.follower ? user.follower.length : 0}{" "}
            <span className="font-light dark:text-white/70">Followers</span>
          </p>
          <p>
            {user.following ? user.following.length : 0}{" "}
            <span className="font-light dark:text-white/70">Following</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
