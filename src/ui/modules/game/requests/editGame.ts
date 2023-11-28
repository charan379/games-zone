import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function editGame(gameId: number, newName: string, authToken?: string): Promise<GZResponse<Game>> {
    return gzRequest<null, null, Game>({
        requestMethod: "PUT",
        requestPath: `/api/game/update/${gameId}/name/${newName}`,
        authToken: authToken,
    });
}