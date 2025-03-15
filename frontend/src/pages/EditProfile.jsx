import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../config/Axios";
import { capitalizeName } from "../config/helping";
import { userAction } from "../store/userSlice";
import { MdEdit, MdDelete } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import EditProfileSkeleton from "../components/Loaders/EditProfileSkeleton";

const EditProfile = () => {
  const [error, setError] = useState("");
  const profileRef = useRef(null);
  const coverRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    currPassword: "",
    newPassword: "",
    bio: "",
  });
  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname || "",
        username: user.username || "",
        currPassword: "",
        newPassword: "",
        bio: user.bio || "",
      });
    }
  }, [user]);
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    if (
      (form.fullname == user.fullname || !form.fullname) &&
      (form.username == user.username || !form.username) &&
      !form.currPassword &&
      form.newPassword &&
      (form.bio == user.bio || !form.bio)
    ) {
      setError("Nothing to update");
      return;
    }
    setLoading(true);
    Axios.put("/user/update-profile", {
      ...form,
      fullname: capitalizeName(form.fullname),
      coverImg,
      profileImg,
    }).then((res) => {
      if (!res.data.error) {
        setLoading(false);
        toast.success("Profile updated succesfully", {
          duration: 2000,
        });
        dispatch(userAction.getMe(res.data.user));
      } else {
        setLoading(false);
        setError(res.data.message);
      }
    });
  };
  const handleImg = (e) => {
    if (e.target.name == "profileImg") {
      let file = e.target.files[0];
      if (file) {
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
          alert(
            "File size too large! Please select an image smaller than 10MB."
          );
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setProfileImg(reader.result);
        };
      }
    }
    if (e.target.name == "coverImg") {
      let file = e.target.files[0];
      if (file) {
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          alert(
            "File size too large! Please select an image smaller than 10MB."
          );
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setCoverImg(reader.result);
        };
      }
    }
  };
  const deleteImg = (img) => {
    toast.promise(
      Axios.put("/user/delete-image", { img }).then((res) => {
        if (!res.data.error) {
          dispatch(userAction.getMe(res.data.user));
          if (img == "profileImg") {
            setProfileImg("");
          } else {
            setCoverImg("");
          }
        }
      }),
      {
        loading: "Deleting image...",
        success: "Image deleted successfully!",
        error: "Failed to delete image. Please try again.",
      }
    );
  };
  return !user ? (
    <EditProfileSkeleton />
  ) : (
    <div className="mt-[50px] relative">
      <input
        type="file"
        accept="image/*"
        ref={profileRef}
        className="hidden"
        name="profileImg"
        onChange={handleImg}
      />
      <input
        type="file"
        accept="image/*"
        ref={coverRef}
        className="hidden"
        name="coverImg"
        onChange={handleImg}
      />
      <div className="w-full h-50 relative bg-gray-400 dark:bg-white flex justify-center">
        {(user.coverImg || coverImg) && (
          <img
            className="h-50 w-full object-cover"
            src={coverImg ? coverImg : user.coverImg && user.coverImg}
            alt="cover"
          />
        )}
        <button className="absolute right-5 top-1">
          <MdEdit
            color="black"
            onClick={() => coverRef.current.click()}
            cursor="pointer"
            size={28}
          />
        </button>
        {user.coverImg && (
          <button
            onClick={() => {
              deleteImg("coverImg");
            }}
            className="absolute left-5 top-1"
          >
            <MdDelete color="black" cursor="pointer" size={28} />
          </button>
        )}
      </div>
      <div className=" md:absolute md:right-[40%] 3xl:right-[45%] md:top-35 bg-white rounded dark:bg-black p-0.5 flex gap-3 items-center">
        <img
          className=" w-30 h-30 object-cover rounded "
          src={
            profileImg
              ? profileImg
              : user.profileImg
              ? user.profileImg
              : "/img/profile.jpg"
          }
          alt=""
        />
        <div className="w-full relative mt-2 md:hidden flex flex-col gap-2">
          <button className="w-fit cursor-pointer border-[1px] border-black dark:border-white py-1 px-3 rounded-full">
            Change profile pic
          </button>
          <button
            onClick={() => {
              deleteImg("profileImg");
            }}
            className="w-fit cursor-pointer border-[1px] border-black dark:border-white py-1 px-3 rounded-full"
          >
            Delete profile pic
          </button>
        </div>
      </div>
      <div className="w-full relative mt-2 hidden md:block">
        <button
          onClick={() => {
            profileRef.current.click();
          }}
          className="cursor-pointer border-[1px] border-black dark:border-white py-1 px-3 rounded-full absolute left-2"
        >
          Change profile pic
        </button>
        <button
          onClick={() => {
            deleteImg("profileImg");
          }}
          className="cursor-pointer border-[1px] border-black dark:border-white py-1 px-3 rounded-full absolute right-2"
        >
          Delete profile pic
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 m-3 md:mt-20"
      >
        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
          <input
            placeholder="Fullname"
            value={form.fullname}
            onChange={handleOnChange}
            className="placeholder:text-gray-700 outline-0 px-1 py-2 border-[1px] rounded border-black dark:border-gray-700"
            type="text"
            name="fullname"
          />
          <input
            placeholder="Username"
            value={form.username}
            onChange={handleOnChange}
            type="text"
            name="username"
            className="placeholder:text-gray-700 outline-0 px-1 py-2 border-[1px] rounded border-black dark:border-gray-700"
          />
        </div>
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center">
          <input
            value={form.currPassword}
            onChange={handleOnChange}
            name="currPassword"
            placeholder="Current Password"
            className="placeholder:text-gray-700 outline-0 px-1 py-2 border-[1px] rounded border-black dark:border-gray-700"
            type="password"
          />
          <input
            value={form.newPassword}
            onChange={handleOnChange}
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="placeholder:text-gray-700 outline-0 px-1 py-2 border-[1px] rounded border-black dark:border-gray-700"
          />
        </div>
        <textarea
          value={form.bio}
          onChange={handleOnChange}
          className="placeholder:text-gray-700 resize-none outline-0 px-1 py-2 border-[1px] rounded border-black dark:border-gray-700"
          rows={3}
          placeholder="Enter your bio"
          name="bio"
        ></textarea>
        {error && <p className="text-red-500 w-full text-center">{error}</p>}
        <div className="w-full flex justify-center">
          <button className=" cursor-pointer border-[1px] border-black dark:border-white py-1 px-3 rounded">
            {loading ? <PulseLoader color="#178746" size={6} /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
