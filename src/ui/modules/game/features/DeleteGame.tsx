"use client";

import ModalLayout from "@/ui/components/modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import deleteGame from "../requests/deleteGame";

interface Props {
  close: () => void;
  game?: Game;
  onSuccess: (game: Game, actionType: "UPDATE_GAME" | "APPEND_GAME") => void;
}

const DeleteGame: React.FC<Props> = (props) => {
  const { close, game, onSuccess } = props;

  const { data: session, status: authStatus } = useSession();

  const [messages, setMessages] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");
    setIsLoading(true);
    if (game?.gameId)
      deleteGame(game.gameId, session?.auth?.token)
        .then((res) => {
          if (res.ok && res?.result) {
            setMessages(res?.result?.message);
            onSuccess({ ...game, renderStatus: "deleted" }, "UPDATE_GAME");
          } else {
            setMessages(res?.error?.errorMessage ?? "Somthing went wrong !");
          }
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 50);
        });
  };

  return (
    <ModalLayout label={`Delete Game : ${game?.gameId}`}>
      <form className="px-8 py-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <span key={3423} className="font-semibold text-red-500">
            {" "}
            Are you surely want to delete this game : {game?.gameId} /{" "}
            {game?.gameName}
          </span>
          <span key={32432} className="text-yellow-600 font-semibold">
            On Confirming all the Slots and its corresponding bookings will also
            get deleted along with this game !
          </span>
        </div>
        <div className="flex mt-4 justify-between items-baseline">
          <Button
            rounded="rounded-md"
            danger
            key={`ad-1`}
            type="submit"
            isLoading={isLoading}
          >
            Delete
          </Button>

          {/* prettier-ignore */}
          <Button rounded="rounded-md" key={`ad-2`} type="button" onClick={close}>
              Close
            </Button>
        </div>
        <div className="text-sm mt-4">{messages}</div>
      </form>
    </ModalLayout>
  );
};

export default DeleteGame;
