import gzRequest from "@/lib/utils/gzRequest";

export default async function cancelBooking(
    bookingId: number,
    authToken?: string
): Promise<GZResponse<GenericResponse>> {
    return gzRequest<null, null, GenericResponse>({
        requestMethod: "PUT",
        requestUrl: `http://localhost:3333/api/booking/${bookingId}/cancel`,
        authToken: authToken,
    });
}