const SkeletonPost = () => {
  return (
    <>
      <div className="h-fit flex gap-2 p-2 border-b-[1px] border-black dark:border-gray-700 animate-pulse">
        {/* Profile Image Skeleton */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        <div className="flex-1 flex flex-col gap-2 justify-center">
          {/* Header Skeleton */}
          <div className="flex gap-2 justify-between items-center">
            <div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-3 mt-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded border-[1px] border-black dark:border-gray-700"></div>
        </div>
      </div>
      <div className="h-fit flex gap-2 p-2 border-b-[1px] border-black dark:border-gray-700 animate-pulse">
        {/* Profile Image Skeleton */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        <div className="flex-1 flex flex-col gap-2 justify-center">
          {/* Header Skeleton */}
          <div className="flex gap-2 justify-between items-center">
            <div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-3 mt-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Text Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      <div className="h-fit flex gap-2 p-2 border-b-[1px] border-black dark:border-gray-700 animate-pulse">
        {/* Profile Image Skeleton */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        <div className="flex-1 flex flex-col gap-2 justify-center">
          {/* Header Skeleton */}
          <div className="flex gap-2 justify-between items-center">
            <div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-3 mt-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Text Skeleton */}
          <div className="space-y-2">
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded border-[1px] border-black dark:border-gray-700"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonPost;
