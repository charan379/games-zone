import gzRequest from "@/lib/utils/gzRequest";

// prettier-ignore
export default async function fetchSlotAvailabilityRecords(query: { forDate: string }, gameId: number, authToken?: string): Promise<GZResponse<SlotAvailabilityRecord[]>> {
    return gzRequest<{ forDate: string }, null, SlotAvailabilityRecord[]>({
        requestMethod: "GET",
        requestQuery: { ...query, forDate: query.forDate },
        requestPath: `/booking/game/${gameId}/slots/availability`,
        authToken: authToken,
    });
}