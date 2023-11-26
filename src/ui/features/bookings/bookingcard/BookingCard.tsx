import Button from "@/ui/components/common/Button";
import React from "react";
import BookingCardSection from "./components/BookingCardSection";
import BookingDetailsSection from "./components/BookingDetailsSection";
import SlotDetailsSection from "./components/SlotDetailsSection";
import UserDetailsSection from "./components/UserDetailsSection";

interface Props {
  booking: Partial<Booking>;
  updateBooking: (b: Partial<Booking>) => void;
}

const BookingCard: React.FC<Props> = (props) => {
  const { booking, updateBooking } = props;

  // prettier-ignore
  const handleUpdate = (status: "APPROVED" | "REQUESTED" | "REJECTED" | "CANCELLED" ) => {
    updateBooking({...booking, bookingStatus: status});
  };

  return (
    <div className="mt-1 w-full max-w-4xl relative mx-auto text-center">
      <div className="mt-4 w-full bg-white shadow-md rounded-lg text-left">
        <div className="h-2 w-full bg-slate-400 rounded-t-md"></div>
        {/* booking */}
        <BookingCardSection>
          <BookingDetailsSection
            bookingId={booking.bookingId}
            forDate={booking.forDate}
            transactionDate={booking.transactionDate}
            bookingStatus={booking.bookingStatus}
          />
        </BookingCardSection>
        {/* Game / Slot */}
        {(booking?.game || booking?.slot) && (
          <BookingCardSection>
            <SlotDetailsSection
              game={booking.game as Partial<Game>}
              slot={booking.slot as Slot}
            />
          </BookingCardSection>
        )}
        {/* User */}
        {booking?.user && (
          <BookingCardSection>
            <UserDetailsSection user={booking.user as Partial<User>} />
          </BookingCardSection>
        )}
        {/* Actions */}
        {booking.bookingStatus === "REQUESTED" && (
          <div className="flex flex-col sm:flex-row px-2 py-2 gap-3 sm:gap-5 bg-gray-50 rounded-md shadow-sm">
            <Button
              success
              rounded={"rounded-md"}
              onClick={() => handleUpdate("APPROVED")}
            >
              Approve
            </Button>
            <Button
              danger
              rounded={"rounded-md"}
              onClick={() => handleUpdate("CANCELLED")}
            >
              Cancel
            </Button>
            <Button
              danger
              rounded={"rounded-md"}
              onClick={() => handleUpdate("REJECTED")}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
