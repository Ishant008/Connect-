import React from 'react'
import FollowBTN from '../Buttons/FollowBTN'
import { Link } from 'react-router'

const SuggestionCard = ({user}) => {
  return (
    <div className='w-full flex justify-between gap-1.5 items-center py-1'>
      <img className='w-10 h-10 object-cover rounded-full ' src={user.profileImg ?user.profileImg: "/img/profile.jpg"} alt="Profile" />
      <Link to={`/profile/${user.username}`} className='flex-1  flex flex-col gap-1'>
        <h6 className='w-full line-clamp-1 text-sm font-semibold'>{user.fullname}</h6>
        <p className='w-full line-clamp-1 font-light dark:text-white/60 text-sm'>@{user.username}</p>
      </Link>
      <FollowBTN className='xl:p-2 xl:px-3 xl:mx-2 px-2 text-sm'  username={user.username} id={user._id}/>
    </div>
  )
}

export default SuggestionCard
