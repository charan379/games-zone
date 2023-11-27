import gzRequest from "@/lib/utils/gzRequest";

export default async function addGame(
    newGame: Game,
    authToken?: string
): Promise<GZResponse<Game>> {
    return gzRequest<null, Game, Game>({
        requestMethod: "POST",
        requestUrl: "http://localhost:3333/api/game/add",
        requestBoby: newGame,
        authToken: authToken,
    });
}