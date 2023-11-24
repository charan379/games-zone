import Link from "next/link";
import React from "react";

interface Props {
  id: number;
  game: Game;
}

const GameCard: React.FC<Props> = (props) => {
  const { id, game } = props;

  return (
    <Link
      href={`games/${id}/slots`}
      className="relative p-3 font-semibold sm:max-w-md md:max-w-[280px] bg-gray-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-900 dark:border-gray-900"
    >
      {game.gameName}
    </Link>
  );
};

export default GameCard;
