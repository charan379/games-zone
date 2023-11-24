import gzRequest from "@/lib/utils/gzRequest";
import ModalLayout from "@/ui/components/Modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  close: () => void;
  gameId: number;
  slot: Slot;
}

const DeleteSlot: React.FC<Props> = (props) => {
  const { close, gameId, slot } = props;

  const { data: session, status: authStatus } = useSession();

  const [messages, setMessages] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages("");

    deleteSlot(gameId, slot.slotId, session?.auth?.token)
      .then((res) => {
        if (res.ok && res.result) {
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
    <ModalLayout label={`Delete Slot : ${slot?.slotId}`}>
      <form className="px-8 py-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 justify-center items-center">
          <span key={3423} className="font-semibold text-red-500">
            {" "}
            Are you surely want to delete this slot : {slot?.slotId} /{" "}
            {slot?.slotName} belonging to game : {slot.gameId}
          </span>
          <span key={32432} className="text-yellow-600 font-semibold">
            On Confirming all its corresponding bookings will also get deleted
            along with this slot !
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
        <div className="text-sm">{messages}</div>
      </form>
    </ModalLayout>
  );
};

export default DeleteSlot;

// prettier-ignore
async function deleteSlot(gameId: number, slotId: number, authToken?: string): Promise<GZResponse<GenericResponse>> {
    return gzRequest<null, null, GenericResponse>({
      requestMethod: "DELETE",
      requestUrl: `http://localhost:3333/api/game/slot/${slotId}`,
      authToken: authToken,
    });
  }
