import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SlotForm from "./SlotForm";
import gzRequest from "@/lib/utils/gzRequest";

interface Props {
  close: () => void;
  gameId: number;
  slot: Slot;
}

const EditSlot: React.FC<Props> = (props) => {
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

    editSlot(gameId, slot.slotId, slot, session?.auth?.token)
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
    <ModalLayout label={`Edit Slot : ${slot.slotId}`}>
      {/* prettier-ignore */}
      <SlotForm slot={slot} handleFormSubmit={handleSubmit} handleChange={handleChange}>
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

export default EditSlot;

// prettier-ignore
async function editSlot(gameId: number, slotId: number,update: Partial<Slot> , authToken?: string): Promise<GZResponse<Slot>> {
    return gzRequest<null, Partial<Slot>, Slot>({
      requestMethod: "PUT",
      requestUrl: `http://localhost:3333/api/game/${gameId}/update/slot/${slotId}`,
      requestBoby: update,
      authToken: authToken,
    });
  }
