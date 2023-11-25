import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import gzRequest from "@/lib/utils/gzRequest";

interface Props {
  close: () => void;
  gameId: number;
  slot?: Slot;
}

const AddSlot: React.FC<Props> = (props) => {
  const { close, gameId, slot: existingSlot } = props;

  const { data: session, status: authStatus } = useSession();

  const [messages, setMessages] = useState("");

  //   prettier-ignore
  const [slot, SetSlot] = useState<Slot>(existingSlot as Slot);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    SetSlot({ ...slot, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");

    addSlot(gameId, slot, session?.auth?.token)
      .then((res) => {
        if (res.ok && res.result) {
          setMessages(JSON.stringify(res?.result));
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
    <ModalLayout label={`Add New Slot For Game : ${gameId} `}>
      <SlotForm
        slot={slot}
        handleChange={handleChange}
        handleFormSubmit={handleSubmit}
      >
        <div className="flex justify-between items-baseline">
          <Button rounded="rounded-md" key={`ad-1`} type="submit">
            Submit
          </Button>

          {/* prettier-ignore */}
          <Button rounded="rounded-md" danger key={`ad-2`} type="button" onClick={close} >
            Close
          </Button>
        </div>
        <div className="text-sm">{messages}</div>
      </SlotForm>
    </ModalLayout>
  );
};

export default AddSlot;

//   prettier-ignore
async function addSlot(gameId: number, newSlot: Partial<Slot>,authToken?: string): Promise<GZResponse<Slot>> {
  return gzRequest<null, Partial<Slot>, Slot>({
    requestMethod: "POST",
    requestUrl: `http://localhost:3333/api/game/${gameId}/add/slot`,
    requestBoby: newSlot,
    authToken: authToken,
  });
}