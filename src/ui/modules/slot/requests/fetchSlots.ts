import gzRequest from "@/lib/utils/gzRequest";

export default async function fetchSlots(
    gameId: number,
    query: SlotQuery,
    authToken?: string
): Promise<GZResponse<GZPage<Slot>>> {
    return gzRequest<SlotQuery, null, GZPage<Slot>>({
        requestMethod: "GET",
        requestQuery: query,
        requestUrl: `http://localhost:3333/api/game/${gameId}/slots/search`,
        authToken: authToken,
    });
}