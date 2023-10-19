import Image from "next/image";
import React from "react";

interface Props {
  name: string;
}

const GameCard: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <div className="relative max-w-xs bg-gray-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-900 dark:border-gray-900">
      <div className="w-full h-[80%] rounded-t-lg overflow-hidden">
        <Image
          src="/sports.jpg"
          alt="Sports image"
          className=""
          height={340}
          width={340}
          priority
        />
      </div>

      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold tracking-tight">{name}</h5>
          <a
            href="#"
            className="bg-gray-700 hover:bg-gray-900 text-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
          >
            Book Slot
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
