import ModalLayout from "@/ui/components/modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SlotForm from "../components/SlotForm";
import editSlot from "../requests/editSlot";

interface Props {
  close: () => void;
  gameId: number;
  slot: Slot;
  onSuccess: (slot: Slot, actionType: "UPDATE_SLOT" | "APPEND_SLOT") => void;
}

const EditSlot: React.FC<Props> = (props) => {
  const { close, gameId, slot: existingSlot, onSuccess } = props;

  const { data: session, status: authStatus } = useSession();

  const [messages, setMessages] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   prettier-ignore
  const [slot, SetSlot] = useState<Slot>(existingSlot as Slot);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    SetSlot({ ...slot, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");
    setIsLoading(true);
    editSlot(gameId, slot.slotId, slot, session?.auth?.token)
      .then((res) => {
        if (res.ok && res?.result) {
          setMessages("Done !");
          onSuccess({ ...res.result, renderStatus: "updated" }, "UPDATE_SLOT");
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
    <ModalLayout label={`Edit Slot : ${slot.slotId}`}>
      {/* prettier-ignore */}
      <SlotForm slot={slot} handleFormSubmit={handleSubmit} handleChange={handleChange}>
        <div className="flex mt-4 justify-between items-baseline">
          <Button rounded="rounded-md" key={`ad-1`} type="submit" isLoading={isLoading}>
            Submit
          </Button>

          {/* prettier-ignore */}
          <Button rounded="rounded-md" danger key={`ad-2`} type="button" onClick={close}>
            Close
          </Button>
        </div>
        <div className="mt-4 text-sm">{messages}</div>
      </SlotForm>
    </ModalLayout>
  );
};

export default EditSlot;
