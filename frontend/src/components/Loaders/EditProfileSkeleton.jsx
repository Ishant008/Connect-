const EditProfileSkeleton = () => {
  return (
    <div className="mt-[50px] relative animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="w-full h-50 bg-gray-300 dark:bg-gray-700 relative"></div>

      {/* Profile Image Skeleton */}
      <div className="md:absolute md:right-[40%] 3xl:right-[45%] md:top-35 bg-white dark:bg-black p-0.5 flex gap-3 items-center">
        <div className="w-30 h-30 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Form Skeleton */}
      <div className="flex flex-col gap-3 m-3 md:mt-20">
        <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
          <div className="w-full md:w-[45%] h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-full md:w-[45%] h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-3 flex-col md:flex-row w-full justify-center">
          <div className="w-full md:w-[45%] h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-full md:w-[45%] h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="w-full flex justify-center">
          <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
export default EditProfileSkeleton;