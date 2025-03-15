

const NotificationSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex justify-between border-b-[1px] border-black dark:border-gray-700 p-2 animate-pulse">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div>
              <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-48 h-3 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
