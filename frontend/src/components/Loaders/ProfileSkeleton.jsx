const ProfileSkeleton = () => {
  return (
    <div className="mt-[50px] pb-3 relative border-b-[1px] border-black dark:border-gray-700 animate-pulse">
      {/* Skeleton Cover Image */}
      <div className="w-full h-50 bg-gray-300 dark:bg-gray-500"></div>

      {/* Skeleton Profile Image */}
      <div className="absolute top-34 left-5 bg-white dark:bg-black p-0.5 rounded-full">
        <div className="w-28 h-28 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* Skeleton Edit Profile Button */}
      <div className="w-full flex justify-end pr-3 mt-2">
        <div className="w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* Skeleton User Info */}
      <div className=" flex flex-col mt-6 mx-4">
        <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-1/4 h-5 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>
        <div className=" h-12 bg-gray-300 dark:bg-gray-600 rounded mt-3"></div>

        {/* Skeleton Followers & Following */}
        <div className="mt-3 flex gap-3 font-bold text-lg">
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
