export default async function gzRequest<Q, B, R>({ requestQuery, requestBoby, requestUrl, requestMethod, authToken }: GZRequestArgs<Q, B>): Promise<GZResponse<R>> {
    // 
    let url = requestUrl;
    // 
    let requestProperties: RequestInit = { method: requestMethod };
    //
    let requestHeaders: HeadersInit = { 'Content-Type': 'application/json' };

    // if there is any query then append it
    if (requestQuery) {
        const queryString = new URLSearchParams(requestQuery).toString();
        url = `${requestUrl}?${queryString}`
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