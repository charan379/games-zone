import Bookings from "@/ui/modules/bookings-module/views/Bookings";

export default function UserBookingspage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <Bookings view="ADMIN" />
    </main>
  );
}
