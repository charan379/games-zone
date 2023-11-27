"use client";

import ModalLayout from "@/ui/components/modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import TextInput from "@/ui/components/form/TextInput";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import addGame from "../requests/addGame";

interface Props {
  close: () => void;
  onSuccess: (game: Game, actionType: "UPDATE_GAME" | "APPEND_GAME") => void;
}

const AddGame: React.FC<Props> = (props) => {
  const { close, onSuccess } = props;

  const { data: session, status: authStatus } = useSession();

  const [gameName, setGameName] = useState("");

  const [messages, setMessages] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");
    setIsLoading(true);
    addGame({ gameName } as Game, session?.auth?.token)
      .then((res) => {
        if (res.ok && res?.result) {
          setMessages("Added !");
          onSuccess({ ...res.result, renderStatus: "new" }, "APPEND_GAME");
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
    <ModalLayout label="Add New Game">
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
        <div className="mt-4 text-sm">{messages}</div>
      </form>
    </ModalLayout>
  );
};

export default AddGame;
