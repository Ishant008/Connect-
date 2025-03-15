import { useContext } from "react";
import Post from "./Post";
import { ContextStore } from "../../../contextStore/ContextStore";

const PostContainer = () => {
   const {posts} = useContext(ContextStore)
  return (
    posts && (
      <div className="h-fit">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    )
  );
};

export default PostContainer;
