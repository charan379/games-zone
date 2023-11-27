import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function deleteSlot(gameId: number, slotId: number, authToken?: string): Promise<GZResponse<GenericResponse>> {
    return gzRequest<null, null, GenericResponse>({
        requestMethod: "DELETE",
        requestUrl: `http://localhost:3333/api/game/slot/${slotId}`,
        authToken: authToken,
    });
}