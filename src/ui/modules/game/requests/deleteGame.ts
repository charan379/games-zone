import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function deleteGame(gameId: number, authToken?: string): Promise<GZResponse<GenericResponse>> {
    return gzRequest<null, null, GenericResponse>({
        requestMethod: "DELETE",
        requestUrl: `http://localhost:3333/api/game/${gameId}`,
        authToken: authToken,
    });
}