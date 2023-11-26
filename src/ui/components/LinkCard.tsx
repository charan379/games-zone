import Link from "next/link";
import React from "react";

interface LinkCardProps {
  title: string;
  link: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, link }) => {
  return (
    <Link
      className={`flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-gradient-to-r from-gray-900 to-gray-600 hover:bg-gradient-to-tl text-white rounded-md shadow-xl cursor-pointer hover:scale-110 transition duration-300 delay-50`}
      href={link}
    >
      <div className="min-h-[110px] flex flex-col-reverse">
        <div className="font-semibold text-2xl text-center">{title}</div>
      </div>
    </Link>
  );
};

export default LinkCard;
