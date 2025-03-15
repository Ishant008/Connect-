import { Link } from "react-router";
import { useContext } from "react";
import { ContextStore } from "../contextStore/ContextStore";

const NotFound = () => {
  let { darkMode } = useContext(ContextStore);

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-6 text-center ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative">
        {/* Large 404 Text with Animation */}
        <h1 className="text-[10rem] md:text-[14rem] font-extrabold tracking-wide relative">
          404
          <span
            className="absolute inset-0 animate-ping"
            style={{ color: darkMode ? "#444" : "#ddd" }}
          >
            404
          </span>
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-lg md:text-xl opacity-70">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Fancy Button */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 rounded-full text-lg font-semibold shadow-lg bg-white text-black
          hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
