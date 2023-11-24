import React from "react";

const SlotLocationLoadingSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {[...Array(2)].map((value, index) => {
        return (
          <div
            className="flex flex-col justify-center items-center"
            key={index}
          >
            <TopBarSkeleton />
            <div className="mt-3 flex flex-row flex-wrap justify-start items-center gap-x-5 gap-y-3">
              {[...Array(10)].map((value, index) => {
                return <SlotSkeleton key={index} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlotLocationLoadingSkeleton;

const TopBarSkeleton: React.FC = () => {
  return (
    <div className="h-12 w-[100%] mt-5 bg-gray-300 rounded-md overflow-hidden">
      <div className="animate-pulse h-full bg-slate-400"></div>
    </div>
  );
};

const SlotSkeleton: React.FC = () => {
  return (
    <div className="h-20 w-32 bg-gray-300 rounded-md overflow-hidden">
      <div className="animate-pulse h-full bg-slate-400"></div>
    </div>
  );
};
