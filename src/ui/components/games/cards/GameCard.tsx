import Link from "next/link";
import React from "react";

interface Props {
  name: string;
}

const GameCard: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <Link href="#" className="relative sm:max-w-md md:max-w-[280px] bg-gray-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-900 dark:border-gray-900">

      <div className="px-3 py-3">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold tracking-tight">{name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
