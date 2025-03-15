import axios from 'axios';

const Axios = axios.create({
  baseURL:"https://connect-s5nq.onrender.com/api",
  withCredentials: true,
})

export default Axios;
