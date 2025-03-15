import { useContext, useRef, useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { TbPhotoPlus } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { ContextStore } from "../../../contextStore/ContextStore";
import Axios from "../../../config/Axios";

const CreatePost = () => {
  const user = useSelector((store) => store.user);
  const { posts, setPosts } = useContext(ContextStore);
  const imageRef = useRef(null);
  const [disable, setDisable] = useState(true);
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const inputImg = () => {
    imageRef.current.click();
  };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size too large! Please select an image smaller than 10MB.");
        setLoading(false);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImg(reader.result);
        setLoading(false);
        setDisable(false);
      };
    }
  };
  const deleteInputImg = () => {
    setImg("");
    setDisable(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (img || text) {
      setPostLoading(true);
      setDisable(true);
      Axios.post("/post/create-post", { text, img }).then((res) => {
        if (!res.data.error) {
          setPostLoading(false);
          let newPosts = [res.data.post, ...posts];
          setPosts(newPosts);
          setImg("");
          setText("");
        } else {
          setImg("");
          setText("");
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex px-3 mt-[50px] gap-5 border-b-[1px] border-black dark:border-gray-700 3xl:mt-[80px] 3xl:text-2xl"
    >
      <img
        className="mt-4 w-10 h-10 object-cover rounded-full "
        src={user.profileImg ? user.profileImg : "/img/profile.jpg"}
        alt="Profile"
      />
      <input
        className="hidden"
        onChange={(e) => handleImgChange(e)}
        accept="image/*"
        ref={imageRef}
        type="file"
        name="image"
      />
      <div className="flex-1 p-1 flex flex-col gap-1">
        <h6 className="text-gray-700 dark:text-gray-500">Write a post!</h6>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (text) {
              setDisable(false);
            }
          }}
          maxLength={250}
          rows={1}
          className="w-full outline-0 border-b-[1px] border-black dark:border-gray-700 p-1 text-scroll resize-none"
          type="text"
        />
        {loading ? (
          <div className="w-full h-50 flex justify-center items-center">
            loading...
          </div>
        ) : (
          img && (
            <div className="w-full h-50 flex justify-center mt-2 relative">
              <img className="max-h-full" src={img} alt="" />
              <MdDeleteOutline
                onClick={deleteInputImg}
                size={28}
                className="absolute right-3 top-0 cursor-pointer"
              />
            </div>
          )
        )}
        <div className="my-2 flex justify-between items-center">
          <div className="text-3xl text-primary flex items-center gap-2">
            <TbPhotoPlus onClick={inputImg} className="cursor-pointer" />
            <MdEmojiEmotions className="cursor-pointer" />
          </div>
          <button
            className={`
              ${
                disable
                  ? "cursor-not-allowed bg-green-800"
                  : "cursor-pointer bg-primary "
              } font-btn text-white font-semibold rounded-full py-2 px-5 text-center hover:bg-green-800`}
          >
            {postLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
