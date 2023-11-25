import Button from "@/ui/components/common/Button";
import React from "react";
import BookingCardSection from "./components/BookingCardSection";
import BookingDetailsSection from "./components/BookingDetailsSection";
import SlotDetailsSection from "./components/SlotDetailsSection";
import UserDetailsSection from "./components/UserDetailsSection";

const BookingCard = () => {
  return (
    <div className="w-full max-w-4xl relative py-5 mx-auto text-center">
      <div className="mt-4 w-full bg-white shadow-md rounded-lg text-left">
        <div className="h-2 w-full bg-slate-400 rounded-t-md"></div>
        {/* booking */}
        <BookingCardSection>
          <BookingDetailsSection
            bookingId={dd.bookingId}
            forDate={dd.forDate}
            transactionDate={dd.transactionDate}
            bookingStatus={dd.bookingStatus}
          />
        </BookingCardSection>
        {/* Game / Slot */}
        <BookingCardSection>
          <SlotDetailsSection game={dd.game} slot={dd.slot} />
        </BookingCardSection>
        {/* User */}
        <BookingCardSection>
          <UserDetailsSection user={dd.user} />
        </BookingCardSection>
        {/* Actions */}
        <div className="flex flex-row px-2 py-2 gap-5 bg-gray-50 rounded-md shadow-sm">
          <Button success rounded={"rounded-md"}>
            Approve
          </Button>
          <Button danger rounded={"rounded-md"}>
            Cancel
          </Button>
          <Button danger rounded={"rounded-md"}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

const dd: Booking = {
  bookingId: 1000,
  forDate: "20-12-2023",
  transactionDate: "2023-11-10T21:04:28.138136",
  bookingStatus: "REQUESTED",
  gameId: 1000,
  slotId: 1004,
  userId: 1000,
  game: {
    gameId: 1000,
    gameName: "Cricket",
    image: "",
  },
  slot: {
    slotId: 1004,
    slotName: "Slot5",
    startTime: "08:00:00",
    endTime: "22:00:00",
    location: "Ground 2",
    gameId: 1000,
  },
  user: {
    userId: 1000,
    userName: "testUser1",
    email: "testUser1@gmail.com",
    status: "ACTIVE",
    roles: [
      {
        roleId: 1001,
        roleName: "USER",
      },
      {
        roleId: 1000,
        roleName: "ADMIN",
      },
    ],
  },
};
