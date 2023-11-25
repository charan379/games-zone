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

declare type Booking = {
    bookingId: number,
    forDate: string,
    transactionDate: string,
    bookingStatus: "APPROVED" | "REQUESTED" | "REJECTED" | "CANCELLED" | string,
    gameId: number,
    slotId: number,
    userId: number,
    game: Game,
    slot: Slot,
    user: User,
}

declare type User = {
    userId: number,
    userName: string,
    email: string,
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED" | string,
    roles: UserRole[]
}

declare type UserRole = {
    roleId: number,
    roleName: string,
}

declare type SlotAvailabilityRecord = {
    slot: Slot,
    isBooked: boolean,
    forDate: string,
}

declare type GameQuery = {
    query: string,
    limit: number,
    include: string,
    pageNo: number,
    sort: string,
}

declare type BookingQuery = {
    forDate: string,
    limit: number,
    include: string,
    pageNo: number,
    sort: string,
}

declare type SlotQuery = {
    name: string,
    location: string,
    pageNo: number,
    limit: number,
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
    success?: boolean
    classsName?: string;
    title?: string
}