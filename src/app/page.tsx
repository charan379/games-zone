import SearchForm from "@/ui/components/games/Forms/SearchFrom";
import GameCard from "@/ui/components/games/cards/GameCard";
import Login from "@/ui/features/login/Login";

export default function Home() {
  const sports = [
    { name: "Cricket" },
    { name: "Carroms" },
    { name: "Badminton" },
    { name: "Basket Ball" },
    { name: "Volley Ball" },
    { name: "Table Tennis" },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="text-base left-0 top-0 flex w-full justify-center rounded-md border border-gray-300 bg-gray-200 py-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Book Your Slot for below games
        </p>
        <SearchForm />
      </div>
      <div className="w-full flex flex-row flex-wrap gap-7 items-center justify-center md:justify-start py-5 overflow-hidden">
        {sports.map((sport, index) => {
          return <GameCard {...sport} key={index} />;
        })}
      </div>
    </main>
  );
}
