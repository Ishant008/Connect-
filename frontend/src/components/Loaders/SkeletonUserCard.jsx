import { SlLogout } from "react-icons/sl";

const SkeletonUserCard = () => {
  return (
    <div className="w-full flex items-center justify-around px-0.5 animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="hidden lg:block w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

      {/* Username & Handle Skeleton */}
      <div className="w-[50%] hidden lg:block">
        <div className="w-18 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-15 h-3 mt-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Logout Button Skeleton */}
      <div className="h-fit w-fit p-1.5 rounded-full flex justify-center items-center cursor-pointer ">
              <SlLogout className="lg:text-xl text-2xl" />
            </div>
    </div>
  );
};

export default SkeletonUserCard;
