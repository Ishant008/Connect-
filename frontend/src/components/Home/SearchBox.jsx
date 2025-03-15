import { useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import Axios from "../../config/Axios";

const SearchBox = ({handleSubmit}) => {
  const searchRef = useRef("")
  return (
    <form onSubmit={(e)=>handleSubmit(e,searchRef)} className="w-full md:w-[80%] max-w-6xl flex justify-between gap-1 items-center rounded border-[1px] border-black dark:border-gray-700 px-2 py-1">
      <button className="text-3xl"><IoIosSearch /></button>
    <input ref={searchRef} placeholder="Search" type="text" className="flex-1 p-1 outline-0 text-lg"/>
    </form>
  )
}

export default SearchBox
