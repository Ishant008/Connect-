import React, { useContext, useEffect, useState } from "react";
import CreatePost from "./HomeMain/CreatePost";
import PostContainer from "./HomeMain/PostContainer";
import SkeletonPost from "../Loaders/SkeletonPost";
import Axios from '../../config/Axios'
import { ContextStore } from "../../contextStore/ContextStore";

const HomeMain = () => {
  const [loading,setLoading] = useState(true)
  const {setPosts} = useContext(ContextStore)
  useEffect(()=>{
    Axios.get('/post/get-all-posts').then(res=>{
      if(res.data.posts){
        setLoading(false)
        setPosts(res.data.posts)
      }
    })
  },[])
  return (
    <>
      <CreatePost />
      {loading?<SkeletonPost />:<PostContainer />}
    </>
  );
};

export default HomeMain;
