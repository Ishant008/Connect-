import { useState } from "react"
import { PulseLoader } from "react-spinners"
import Axios from '../../../config/Axios'

const CommentInput = ({id}) => {
  const [text,setText] = useState("")
  const [loading,setLoading] = useState(false)
  const onSubmit=(e)=>{
    e.preventDefault()
    if(text){
      setLoading(true)
      Axios.put(`/post/add-comment/${id}`,{text}).then((res)=>{
        if(!res.data.error){
          setLoading(false)
          setText("")
        }
      })
    }
    
  }
  return (
    <form className="h-[35px] w-full flex gap-2">
      <input value={text} onChange={(e)=>{setText(e.target.value)}} placeholder="Write a Comment!" className=" p-1 flex-1 outline-0 border-b-[1px] border-black dark:border-white focus:border-b-[2px] transition-border duration-100" type="text" />
      <button onClick={onSubmit} className="bg-[#272727] w-28 h-9 py-1 rounded-full px-5">{loading ? <PulseLoader color="#178746"  size={8} /> : "Comment"}</button>
    </form>
  )
}

export default CommentInput
