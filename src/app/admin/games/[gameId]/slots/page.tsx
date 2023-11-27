import AdminSlots from "@/ui/modules/slot/views/AdminSlots";

interface Props {
  params: { gameId: number };
  searchParams: {};
}

export default function GameSlots({ params }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <AdminSlots gameId={params.gameId}/>
    </main>
  );
}
