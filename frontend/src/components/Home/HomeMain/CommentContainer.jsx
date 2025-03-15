import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import socket from "../../../config/socket";

const CommentContainer = ({commentShow,comments,id}) => {

  return (
    <div className={`${commentShow ? "block" : "hidden"} py-1 px-1.5 flex flex-col gap-2 rounded border-[1px] border-black dark:border-gray-700 `}>
      <CommentInput id={id} />
      {comments &&  comments.map((comment, index) => (
        <Comment comment={comment} key={index} isLast={index === comments.length - 1} />
      ))}
    </div>
  );
};

export default CommentContainer;
