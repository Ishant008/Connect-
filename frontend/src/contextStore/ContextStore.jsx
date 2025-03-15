import { createContext, useState } from "react"

export const ContextStore = createContext()

 const ContextProvider = ({children})=>{
  const [loading,setLoading] = useState(false)
  const [notificationDot,setNotificationDot] = useState(false)
  const [darkMode,setDarkMode] = useState(() => {
    const storedDark = localStorage.getItem("dark");
    return storedDark !== null ? JSON.parse(storedDark) : true;
  })
  const [posts,setPosts] = useState([])
  const value = {
    darkMode,
    setDarkMode,
    loading,
    setLoading,
    posts,
    setPosts,
    notificationDot,
    setNotificationDot,
  }
  return(
    <ContextStore.Provider value={value}>
    {children}
    </ContextStore.Provider>
  )
}
export default ContextProvider
 


