import SearchForm from "@/ui/features/games/Forms/SearchFrom";
import GameCard from "@/ui/components/games/cards/GameCard";
import AdminGames from "@/ui/components/games/views/AdminGames";

export default function Games() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-2">

            <AdminGames />

        </main>
    );
}
