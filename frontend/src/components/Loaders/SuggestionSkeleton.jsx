const SuggestionSkeleton = () => {
  return (
    <>
    <div className='w-full flex justify-between gap-1.5 items-center py-1 animate-pulse'>
      {/* Skeleton Profile Image */}
      <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>

      <div className='flex-1 flex flex-col gap-1'>
        {/* Skeleton Full Name */}
        <div className='w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>

        {/* Skeleton Username */}
        <div className='w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded'></div>
      </div>

      {/* Skeleton Follow Button */}
      <div className='w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded'></div>
    </div>
    <div className='w-full flex justify-between gap-1.5 items-center py-1 animate-pulse'>
      {/* Skeleton Profile Image */}
      <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>

      <div className='flex-1 flex flex-col gap-1'>
        {/* Skeleton Full Name */}
        <div className='w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>

        {/* Skeleton Username */}
        <div className='w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded'></div>
      </div>

      {/* Skeleton Follow Button */}
      <div className='w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded'></div>
    </div>
    <div className='w-full flex justify-between gap-1.5 items-center py-1 animate-pulse'>
      {/* Skeleton Profile Image */}
      <div className='w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>

      <div className='flex-1 flex flex-col gap-1'>
        {/* Skeleton Full Name */}
        <div className='w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded'></div>

        {/* Skeleton Username */}
        <div className='w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded'></div>
      </div>

      {/* Skeleton Follow Button */}
      <div className='w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded'></div>
    </div>
    </>
  );
};

export default SuggestionSkeleton;
