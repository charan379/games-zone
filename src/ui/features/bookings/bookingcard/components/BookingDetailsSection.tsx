import React from "react";
import KeyValuePair from "./KeyValuePair";

const BookingDetailsSection: React.FC<Partial<Booking>> = (props) => {
  const { bookingId, forDate, transactionDate, bookingStatus } = props;

  let formattedTransactionDate;

  let color = "bg-slate-500";

  if (transactionDate) {
    formattedTransactionDate = new Date(transactionDate).toLocaleString();
  } else {
    formattedTransactionDate = "";
  }

  switch (bookingStatus) {
    case "APPROVED":
      color = "bg-emerald-500";
      break;
    case "REQUESTED":
      color = "bg-yellow-500";
      break;
    case "CANCELLED":
      color = "bg-red-400";
      break;
    case "REJECTED":
      color = "bg-red-400";
      break;
    default:
      color = "bg-slate-500";
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-1 sm:gap-2">
        <KeyValuePair
          label="Booking ID"
          value={bookingId?.toString()}
          key={1}
        />
        <KeyValuePair label="For Date" value={forDate} key={2} />
        <KeyValuePair
          label="Transaction Date"
          value={formattedTransactionDate}
          key={3}
        />
      </div>
      <KeyValuePair label="Booking Status">
        <div
          className={`px-4 py-1 rounded-full font-semibold ${color} text-white text-xs`}
        >
          {bookingStatus}
        </div>
      </KeyValuePair>
    </>
  );
};

export default BookingDetailsSection;
