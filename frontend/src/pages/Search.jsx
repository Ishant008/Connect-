import { useState } from "react";
import SearchBox from "../components/Home/SearchBox";
import SearchUser from "../components/Home/HomeMain/SearchUser";
import { MoonLoader } from "react-spinners";
import Axios from "../config/Axios";

const Search = () => {
  const [users, setUsers] = useState();
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e, searchRef) => {
    e.preventDefault();
    setResult(false);
    setUsers()
    const text = searchRef.current.value;
    if (text) {
      setLoading(true);
      Axios.post("/user/search", { text }).then((res) => {
        setLoading(false);
        if (!res.data.error) {
          res.data.users.length>0 ? setUsers(res.data.users) : setResult(true);
        }
      });
    }
  };
  return (
    <div className="mt-[70px] p-2 ">
      <div className="flex justify-center">
        <SearchBox handleSubmit={handleSubmit} />
      </div>
      {loading && (
        <div className=" mt-5 flex justify-center">
          <MoonLoader color="#178746" size={28} />
        </div>
      )}
      {users && <div className="m-2 mt-5">
        {users.map((user,index)=>(
          <SearchUser key={index} user={user} />
        ))}
      </div>}
      {result && <div className="mt-5 flex justify-center text-lg md:text-xl">No Matching result Found</div>} 
    </div>
  );
};

export default Search;
