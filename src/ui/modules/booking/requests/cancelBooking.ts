import gzRequest from "@/lib/utils/gzRequest";

export default async function cancelBooking(
    bookingId: number,
    authToken?: string
): Promise<GZResponse<GenericResponse>> {
    return gzRequest<null, null, GenericResponse>({
        requestMethod: "PUT",
        requestPath: `/api/booking/${bookingId}/cancel`,
        authToken: authToken,
    });
}