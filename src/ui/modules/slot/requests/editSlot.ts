import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function editSlot(gameId: number, slotId: number,update: Partial<Slot> , authToken?: string): Promise<GZResponse<Slot>> {
    return gzRequest<null, Partial<Slot>, Slot>({
      requestMethod: "PUT",
      requestUrl: `http://localhost:3333/api/game/${gameId}/update/slot/${slotId}`,
      requestBoby: update,
      authToken: authToken,
    });
  }