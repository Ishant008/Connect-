import { NavLink } from "react-router"

const SearchUser = ({user}) => {
  return (
    <NavLink to={`/profile/${user.username}`} className='flex gap-2 items-center my-2 hover:bg-gray-200 hover:dark:bg-white/10 p-2 transition-all duration-50'>
      <img className="w-12 h-12 object-cover rounded-full" src={user.profileImg ? user.profileImg : "/img/profile.jpg"} alt="profile" />
      <div>
        <p>{user.fullname}</p>
        <p className="font-light">@{user.username}</p>
      </div>
    </NavLink>
  )
}

export default SearchUser
