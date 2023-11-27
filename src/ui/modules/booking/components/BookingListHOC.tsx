import React from "react";
import BookingCardLoadingSkeleton from "./booking-card/components/BookingCardLoadingSkeleton";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

const BookingListHOC: React.FC<Props> = (props) => {
  const { children, loading } = props;

  if (loading) {
    return (
      <>
        <BookingCardLoadingSkeleton key={1} />
        <BookingCardLoadingSkeleton key={2} />
      </>
    );
  }

  return children;
};

export default BookingListHOC;
