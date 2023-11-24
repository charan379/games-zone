"use client";

import gzRequest from "@/lib/utils/gzRequest";
import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  close: () => void;
  game?: Game;
}

const DeleteGame: React.FC<Props> = (props) => {
  const { close, game } = props;

  const { data: session, status: authStatus } = useSession();

  const [messages, setMessages] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");

    if (game?.gameId)
      deleteGame(game.gameId, session?.auth?.token)
        .then((res) => {
          if (res.ok && res.result) {
            console.log(res);
            setMessages(res?.result?.message);
          } else {
            setMessages(res?.error?.errorMessage ?? "Somthing went wrong !");
          }
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {});
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
        <div className="flex justify-between items-baseline">
          <Button rounded="rounded-md" danger key={`ad-1`} type="submit">
            Delete
          </Button>

          {/* prettier-ignore */}
          <Button rounded="rounded-md" key={`ad-2`} type="button" onClick={close}>
              Close
            </Button>
        </div>
      </form>
      <div className="text-sm">{messages}</div>
    </ModalLayout>
  );
};

export default DeleteGame;

// prettier-ignore
async function deleteGame(gameId: number, authToken?: string): Promise<GZResponse<GenericResponse>> {
  return gzRequest<null, null, GenericResponse>({
    requestMethod: "DELETE",
    requestUrl: `http://localhost:3333/api/game/${gameId}`,
    authToken: authToken,
  });
}