import LinkCard from "@/ui/components/LinkCard";

export default function AdminDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <div className="flex sm:flex-row flex-col w-full items-center justify-center gap-4 sm:gap-8 p-4">
        <LinkCard title="Manage Games" link="/admin/games" />
        <LinkCard title="Manage Bookings" link="/admin/bookings" />
      </div>
    </main>
  );
}
