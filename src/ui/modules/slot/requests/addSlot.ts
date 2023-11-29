import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function addSlot(gameId: number, newSlot: Partial<Slot>, authToken?: string): Promise<GZResponse<Slot>> {
    return gzRequest<null, Partial<Slot>, Slot>({
        requestMethod: "POST",
        requestPath: `/game/${gameId}/add/slot`,
        requestBoby: newSlot,
        authToken: authToken,
    });
}