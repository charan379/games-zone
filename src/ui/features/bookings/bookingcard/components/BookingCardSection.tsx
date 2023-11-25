import React from "react";

interface Props {
  children: React.ReactNode;
  name?: string;
}
const BookingCardSection: React.FC<Props> = (props) => {
  const { children, name } = props;
  return (
    <div className="flex flex-col px-2 py-2 gap-2 bg-gray-100">
      {name ? <h3 className="font-semibold">Booking Details</h3> : ""}
      <div className="flex flex-col px-2 py-2 gap-1 sm:gap-2 bg-gray-50 rounded-md shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default BookingCardSection;
