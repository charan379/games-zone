import { authOptions } from "@/lib/nextauth/auth";
import LinkCard from "@/ui/components/LinkCard";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <div className="flex sm:flex-row flex-col w-full items-center justify-center gap-2 sm:gap-8 p-4">
        <LinkCard title="New Booking" link="/games" />
        <LinkCard title="My Bookings" link="/bookings" />
        {session?.user.roles.includes("ROLE_ADMIN") && (
          <LinkCard title="Admin Dashboard" link="/admin" />
        )}
      </div>
    </main>
  );
}
