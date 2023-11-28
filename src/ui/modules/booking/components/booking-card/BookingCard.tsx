'use client';

import Button from "@/ui/components/common/Button";
import React, { useState } from "react";
import BookingCardSection from "./components/BookingCardSection";
import BookingDetailsSection from "./components/BookingDetailsSection";
import SlotDetailsSection from "./components/SlotDetailsSection";
import UserDetailsSection from "./components/UserDetailsSection";
import approveBooking from "../../requests/approveBooking";
import rejectBooking from "../../requests/rejectBooking";
import cancelBooking from "../../requests/cancelBooking";

interface Props {
  booking: Partial<Booking>;
  updateBooking: (b: Partial<Booking>) => void;
  view: "ADMIN" | "USER";
  authToken?: string;
}

const BookingCard: React.FC<Props> = (props) => {

  const { booking, updateBooking, view, authToken } = props;

  const [requesting, setRequesting] = useState<{ approve: boolean, reject: boolean, cancel: boolean }>({ approve: false, cancel: false, reject: false });

  // prettier-ignore
  const handleUpdate = (status: "APPROVED" | "REJECTED" | "CANCELLED") => {

    if (!booking?.bookingId) {
      alert("Somthing went wrong !");
      return;
    }

    switch (status) {
      case "APPROVED":
        setRequesting({ ...requesting, approve: true });
        approveBooking(booking.bookingId, authToken).then((res) => {
          if (res?.ok && res?.result) {
            updateBooking({ ...booking, bookingStatus: "APPROVED" });
          }
        })
        break;
      case "REJECTED":
        setRequesting({ ...requesting, reject: true });
        rejectBooking(booking.bookingId, authToken).then((res) => {
          if (res?.ok && res?.result) {
            updateBooking({ ...booking, bookingStatus: "REJECTED" });
          }
        })
        break;
      case "CANCELLED":
        setRequesting({ ...requesting, cancel: true });
        cancelBooking(booking.bookingId, authToken).then((res) => {
          if (res?.ok && res?.result) {
            updateBooking({ ...booking, bookingStatus: "CANCELLED" });
          }
        })
        break;
      default:
        break;
    }

    setTimeout(() => {
      setRequesting({ approve: false, cancel: false, reject: false });
    }, 100);
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
              view={view}
              game={booking.game as Partial<Game>}
              slot={booking.slot as Slot}
            />
          </BookingCardSection>
        )}
        {/* User */}
        {booking?.user && (
          <BookingCardSection>
            <UserDetailsSection
              view={view}
              user={booking.user as Partial<User>}
            />
          </BookingCardSection>
        )}
        {/* Actions */}
        {booking.bookingStatus === "REQUESTED" && (
          <div className="flex flex-col sm:flex-row px-2 py-2 gap-3 sm:gap-5 bg-gray-50 rounded-md shadow-sm">
            {view === "ADMIN" && (
              <Button
                success
                rounded={"rounded-md"}
                onClick={() => handleUpdate("APPROVED")}
                isLoading={requesting.approve}
              >
                Approve
              </Button>
            )}
            {view === "USER" && (
              <Button
                danger
                rounded={"rounded-md"}
                onClick={() => handleUpdate("CANCELLED")}
                isLoading={requesting.cancel}
              >
                Cancel
              </Button>
            )}
            {view === "ADMIN" && (
              <Button
                danger
                rounded={"rounded-md"}
                onClick={() => handleUpdate("REJECTED")}
                isLoading={requesting.reject}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
