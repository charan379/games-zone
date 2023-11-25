import React from "react";

const BookingCardLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl relative mx-auto text-center">
      <div className="mt-4 w-full bg-white shadow-md rounded-lg text-left">
        <div className="h-2 w-full bg-slate-300 rounded-t-md animate-pulse"></div>
        <div className="flex flex-col px-2 py-2 gap-2 bg-gray-100">
          <div className="min-h-[90px] sm:min-h-[70px] flex flex-col px-2 py-2 gap-1 sm:gap-2 bg-slate-300 rounded-md shadow-sm animate-pulse"></div>
          <div className="min-h-[90px] sm:min-h-[110px] flex flex-col px-2 py-2 gap-1 sm:gap-2 bg-slate-300 rounded-md shadow-sm animate-pulse"></div>
          <div className="min-h-[90px] sm:min-h-[70px] flex flex-col px-2 py-2 gap-1 sm:gap-2 bg-slate-300 rounded-md shadow-sm animate-pulse"></div>
        </div>
        <div className="flex flex-col sm:flex-row px-2 py-2 gap-2 sm:gap-5 bg-gray-50 rounded-md shadow-sm">
          <div className="min-h-[40px] min-w-[120px] text-sm bg-slate-300 py-2 px-4 rounded-md animate-pulse"></div>
          <div className="min-h-[40px] min-w-[120px] text-sm bg-slate-300 py-2 px-4 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardLoadingSkeleton;
