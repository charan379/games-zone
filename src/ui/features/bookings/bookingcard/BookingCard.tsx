import Button from "@/ui/components/common/Button";
import React from "react";
import BookingCardSection from "./components/BookingCardSection";
import BookingDetailsSection from "./components/BookingDetailsSection";
import SlotDetailsSection from "./components/SlotDetailsSection";
import UserDetailsSection from "./components/UserDetailsSection";

interface Props {
  booking: Partial<Booking>;
}

const BookingCard: React.FC<Props> = (props) => {
  const { booking } = props;

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
        {booking.slot && (
          <BookingCardSection>
            <SlotDetailsSection
              game={booking.game as Partial<Game>}
              slot={booking.slot}
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
        <div className="flex flex-col sm:flex-row px-2 py-2 sm:gap-5 bg-gray-50 rounded-md shadow-sm">
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
