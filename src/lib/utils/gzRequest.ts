export default async function gzRequest<Q, B, R>({ requestQuery, requestBoby, requestPath, requestMethod, authToken }: GZRequestArgs<Q, B>): Promise<GZResponse<R>> {

    if (!process.env.NEXT_PUBLIC_BACKEND_HOST) {
        throw Error("BACKEND_HOST is undefined !")
    }
    // 
    let url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}${requestPath}`;
    // 
    let requestProperties: RequestInit = { method: requestMethod };
    //
    let requestHeaders: HeadersInit = { 'Content-Type': 'application/json' };

    // if there is any query then append it
    if (requestQuery) {
        const queryString = new URLSearchParams(requestQuery).toString();
        url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}${requestPath}?${queryString}`
    }

    if (requestMethod !== "GET" && requestBoby) {
        requestProperties = { ...requestProperties, body: JSON.stringify(requestBoby) };
    }

    if (authToken) {
        requestHeaders = { ...requestHeaders, Authorization: `Bearer ${authToken}` }
    }


    requestProperties = { ...requestProperties, headers: requestHeaders };

    const response = await fetch(url, requestProperties);

    return {
        ok: response?.ok,
        statusCode: response.status,
        result: response?.ok ? await response.json() : undefined,
        error: !response?.ok ? await response.json() : undefined
    } as GZResponse<R>
}