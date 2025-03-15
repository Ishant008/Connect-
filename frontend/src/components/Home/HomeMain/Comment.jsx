import { NavLink } from "react-router";

const Comment = ({comment,isLast }) => {
  return (
    <div
      className={`flex gap-2 p-0.5 m-0.5 w-full ${
        !isLast ? "border-b border-black dark:border-gray-700" : ""
      }`}
    >
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={comment.user.profileImg ? comment.user.profileImg : "/img/profile.jpg"}
        alt="profile-pic"
      />
      <div className="flex-1 flex flex-col gap-1 justify-center">
        <NavLink
          className="flex gap-2 items-center"
          to={
            location.pathname !== `/profile/ishant12345` &&
            `/profile/${comment.user.username}`
          }
        >
          <h6 className="font-semibold">{comment.user.fullname}</h6>
          <p className="font-light text-sm text-black dark:text-white/60">
            @{comment.user.username}
          </p>
        </NavLink>
        <div>{comment.text}</div>
      </div>
    </div>
  );
};

export default Comment;
