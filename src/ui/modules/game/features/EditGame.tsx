"use client";

import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import TextInput from "@/ui/components/form/TextInput";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import editGame from "../requests/editGame";

interface Props {
  close: () => void;
  game?: Game;
  onSuccess: (game: Game, actionType: "UPDATE_GAME" | "APPEND_GAME") => void;
}

const EditGame: React.FC<Props> = (props) => {
  const { close, game, onSuccess } = props;

  const { data: session, status: authStatus } = useSession();

  const [gameName, setGameName] = useState(game?.gameName ?? "");

  const [messages, setMessages] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");
    setIsLoading(true);
    if (game?.gameId)
      editGame(game.gameId, gameName, session?.auth?.token)
        .then((res) => {
          if (res.ok && res?.result) {
            setMessages("Done !");
            onSuccess(
              { ...res.result, renderStatus: "updated" },
              "UPDATE_GAME"
            );
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
    <ModalLayout label={`Edit Game : ${game?.gameId}`}>
      <form className="px-8 py-6" onSubmit={handleSubmit}>
        <TextInput
          label="Game Name"
          name="gameName"
          onChange={(e) => setGameName(e.target.value)}
          rounded="rounded-md"
          required={true}
          type="Normal"
          placeholder="Game Name"
          value={gameName}
        />
        <div className="flex mt-4 justify-between items-baseline">
          <Button
            rounded="rounded-md"
            key={`ad-1`}
            type="submit"
            isLoading={isLoading}
          >
            Submit
          </Button>

          {/* prettier-ignore */}
          <Button rounded="rounded-md" danger key={`ad-2`} type="button" onClick={close}>
              Close
            </Button>
        </div>
        <div className="text-sm mt-4">{messages}</div>
      </form>
    </ModalLayout>
  );
};

export default EditGame;
