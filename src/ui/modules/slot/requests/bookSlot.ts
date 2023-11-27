import gzRequest from "@/lib/utils/gzRequest";

interface BookingReqBoby {
    forDate: string;
    slotId: number;
    gameId: number;
    userId: number;
}

export default async function bookSlotRequest(body: BookingReqBoby, authToken?: string) {
    return gzRequest<null, BookingReqBoby, Booking>({
        requestUrl: "http://localhost:3333/api/booking",
        requestMethod: "POST",
        requestBoby: body,
        authToken: authToken,
    });
}