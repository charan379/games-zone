import SearchForm from "@/ui/components/games/Forms/SearchFrom";
import GameCard from "@/ui/components/games/cards/GameCard";
import GamesTable from "@/ui/components/games/lists/GamesTable";

export default function Games() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-2">

            <GamesTable />

        </main>
    );
}
