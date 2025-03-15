import { useContext, useEffect, useState } from "react";
import PostContainer from "./PostContainer";
import Profile from "./Profile";
import { Navigate, useParams } from "react-router";
import Axios from "../../../config/Axios";
import ProfileSkeleton from "../../Loaders/ProfileSkeleton";
import { ContextStore } from "../../../contextStore/ContextStore";
import SkeletonPost from "../../Loaders/SkeletonPost";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [profileLoading, setProfileLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [notFound, setNotFound] = useState(false);
  const { setPosts } = useContext(ContextStore);

  useEffect(() => {
    Axios.get(`/user/profile/${username}`).then((res) => {
      if (!res.data.error) {
        setProfileLoading(false);
        setUser(res.data.user);
        Axios.get(`/post/get-posts/${res.data.user._id}`).then((res) => {
          if (!res.data.error) {
            setPosts(res.data.posts);
            setLoading(false);
          }
        });
      } else {
        setProfileLoading(false);
        setNotFound(true);
      }
    });
  }, [username]);
  if (notFound) return <Navigate to="/not-found" replace />;
  return (
    <>
      {profileLoading ? <ProfileSkeleton /> : <Profile user={user} />}
      {loading ? <SkeletonPost /> : <PostContainer /> }
    </>
  );
};

export default ProfilePage;
