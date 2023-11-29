import gzRequest from "@/lib/utils/gzRequest";

export default async function fetchGames(
    query: GameQuery,
    authToken?: string
): Promise<GZResponse<GZPage<Game>>> {
    return gzRequest<GameQuery, null, GZPage<Game>>({
        requestMethod: "GET",
        requestQuery: query,
        requestPath: "/game/search",
        authToken: authToken,
    });
}