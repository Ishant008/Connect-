import React, { useEffect, useState } from 'react'
import SuggestionCard from './SuggestionCard'
import Axios from '../../config/Axios'
import SuggestionSkeleton from '../Loaders/SuggestionSkeleton'

const HomeRight = () => {
  const [loading,setLoading] = useState(true)
  const [users,setUsers] = useState([])
  const Suggestions =async()=>{
    setLoading(true)
    let response = await Axios.get("/user/suggestions")
    if(response.data.suggestedUser){
      setLoading(false)
      setUsers(response.data.suggestedUser)
    }
  }
  useEffect(()=>{
    Suggestions()
  },[])
  return (
    <div className='hidden lg:flex lg:w-[27%] min-h-screen  relative'>
       <div className="fixed w-[24.3%] 2xl:w-[21.6%]">
        <div className=' bg-gray-200 dark:bg-[#101010] my-3 mx-2 px-2 rounded py-3 flex flex-col gap-3 transition-background-color duration-400'>
          <h5 className='font-bold'>Suggestions</h5>
          {loading ? <SuggestionSkeleton /> : (users && users.map(user=>(
            <SuggestionCard Suggestions={Suggestions} key={user._id} user={user} />
          )) ) }
        </div>
       </div>
    </div>
  )
}

export default HomeRight
