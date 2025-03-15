import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ContextStore } from "./contextStore/ContextStore";
import HomeMain from "./components/Home/HomeMain";
import ProfilePage from "./components/Home/HomeMain/ProfilePage";
import { Navigate } from "react-router";
import Axios from "./config/Axios";
import FullScreenLoader from "./components/Loaders/FullScreenLoader";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";
import Notification from "./pages/Notification";
import Search from "./pages/Search";
import LoginBox from "./components/LoginBox";
import ForgotPassword from "./components/Auth/ForgetPassword";

function ProtectedRoute({ children }) {
  const [authorize, setAuthorize] = useState(null);
  useEffect(() => {
    Axios.get("/auth/authorize-check")
      .then((res) => setAuthorize(res.data.authorize))
      .catch(() => setAuthorize(false));
  }, []);
  if (authorize === null) return <FullScreenLoader />;
  return authorize ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const [authorize, setAuthorize] = useState(null);
  useEffect(() => {
    Axios.get("/auth/authorize-check")
      .then((res) => setAuthorize(res.data.authorize))
      .catch(() => setAuthorize(false));
  }, []);
  if (authorize === null) return <FullScreenLoader />;
  return authorize ? <Navigate to="/" /> : children;
}

function App() {
  const { darkMode } = useContext(ContextStore);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <HomeMain />,
        },
        {
          path: "/profile/:username",
          element: <ProfilePage />,
        },
        {
          path: "/edit-profile/:username",
          element: <EditProfile />,
        },
        {
          path: "/Notification",
          element: <Notification />,
        },
        {
          path:"/search",
          element:<Search />
        },
      ],
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      children:[
        {
          path:"/login",
          element:<LoginBox />
        },
        {
          path:"/login/forget-password",
          element:<ForgotPassword />
        }
      ]
    },
    {
      path: "/not-found",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <NotFound />, 
    },
  ]);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-[100vh] dark:bg-black dark:text-white transition-colors flex justify-center items-center duration-400 font-display overflow-x-hidden`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
