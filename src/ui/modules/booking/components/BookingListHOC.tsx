import React from "react";
import { v4 as uuid4 } from 'uuid';
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
        <BookingCardLoadingSkeleton key={uuid4()} />
        <BookingCardLoadingSkeleton key={uuid4()} />
      </>
    );
  }

  return children;
};

export default BookingListHOC;
