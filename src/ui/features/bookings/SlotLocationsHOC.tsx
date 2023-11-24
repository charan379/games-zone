import React from "react";
import SlotLocationLoadingSkeleton from "./SlotLocationLoadingSkeleton";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}
const SlotLocationsHOC: React.FC<Props> = (props) => {
  const { children, isLoading } = props;

  if (isLoading) {
    return <SlotLocationLoadingSkeleton />;
  }
  return (
    <div className="flex flex-col justify-center items-center">{children}</div>
  );
};

export default SlotLocationsHOC;
