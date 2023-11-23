declare type Game = {
    gameId: number;
    gameName: string;
    image: string;
    slots?: Array<Slot>
}

declare type Slot = {
    slotId: number,
    slotName: string,
    startTime: string,
    endTime: string,
    location: string,
    gameId: number
}

declare type GameQuery = {
    query: string,
    limit: number,
    include: string,
    pageNo: number,
    sort: string,
}
declare type GZError = {
    errorMessage: string,
    errorCode: number,
    timestamp: string
}

declare type GZPage<T> = {
    content: Array<T>,
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean,
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean,
}

declare type GZResponse<T> = {
    statusCode: number,
    ok: boolean,
    result?: T,
    error?: GZError,
}

declare type GenericResponse = {
    message: string;
}

declare type GZRequestArgs<Q, B> = {
    requestQuery?: Q,
    requestBoby?: B,
    requestUrl: string,
    authToken?: string,
    requestMethod: "GET" | "POST" | "PUT" | "DELETE",
}

declare type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    children: React.ReactNode | string,
    disabled?: boolean,
    rounded?: string,
    type?: "submit" | "button"
    danger?: boolean
    classsName?: string;
    title?: string
}