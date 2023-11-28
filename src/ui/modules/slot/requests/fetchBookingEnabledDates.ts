import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function fetchBookingEnabledDates(authToken?: string): Promise<GZResponse<Option[]>> {
    return gzRequest<null, null, Option[]>({
        requestMethod: "GET",
        requestPath: `/api/booking/enabled-dates`,
        authToken: authToken,
    });
}