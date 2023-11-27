import SlotsAvailability from "@/ui/modules/slots-module/views/SlotsAvailability";

interface Props {
  params: { gameId: number };
  searchParams: {};
}

export default function UserSlotsPage({ params, searchParams }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <SlotsAvailability gameId={params.gameId} />
    </main>
  );
}
