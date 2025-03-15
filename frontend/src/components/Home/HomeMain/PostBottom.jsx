import { AiOutlineFire, AiFillFire } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BiSolidComment } from "react-icons/bi";
import CommentContainer from "./CommentContainer";
import { useEffect, useState } from "react";
import Axios from '../../../config/Axios'
import socket from "../../../config/socket";

const PostBottom = ({ comments, id ,likes,user}) => {
  const [comments1,setComments] = useState(comments)
  const [likes1,setLikes] = useState(likes)
  const [commentShow, setCommentShow] = useState(false);
  const handleCommentToggle = () => {
    setCommentShow(!commentShow);
  };
  const handleLike=()=>{
    Axios.put(`post/like-post/${id}`)
  }
  useEffect(() => {
    socket.on("postLike", ({ postID, userID }) => {
      
      if (postID === id) {
        setLikes((prevLikes) => {
          return prevLikes.includes(userID)
            ? prevLikes.filter((like) => like !== userID)
            : [...prevLikes, userID];
        });
      }
    })

    socket.on("postComment",({postID,comment})=>{
      if(postID == id){
        setComments(comment)
      }
    })
  
    return () => {
      socket.off("postLike");
      socket.off("postComment") 
    };
  }, [id]);
  
  
  return (
    <>
      <div className="h-fit">
        <div className="my-1 text-3xl flex justify-around">
          <button onClick={handleLike} className="flex gap-1 hover:text-pink-400">
            {likes1.includes(user) ? <AiFillFire color="#ff007f" cursor="pointer" /> : <AiOutlineFire cursor="pointer" /> }
          <p className="text-lg">{likes1.length}</p></button>
          <button
            className={`${
              commentShow && "text-primary"
            } hover:text-primary flex gap-1`}
            onClick={handleCommentToggle}
          >
            {commentShow ? <BiSolidComment cursor="pointer" /> : <BiComment cursor="pointer" /> }
            <p className="text-lg">{comments1.length}</p>
          </button>
        </div>
        <CommentContainer
          id={id}
          comments={comments1}
          commentShow={commentShow}
        />
      </div>
    </>
  );
};

export default PostBottom;
