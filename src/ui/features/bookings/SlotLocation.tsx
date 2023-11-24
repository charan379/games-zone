import React from "react";

interface Props {
  children: React.ReactNode;
  location: string;
}

const SlotLocation: React.FC<Props> = (props) => {
  const { children, location } = props;
  return (
    <div className="flex flex-row w-full mt-5 gap-3">
      <div className="flex flex-col w-full">
        <h3 className="w-full text-left bg-slate-500 text-white font-semibold p-3 rounded">
          Location : {location}
        </h3>
        <div className="flex flex-row gap-5">{children}</div>
      </div>
    </div>
  );
};

export default SlotLocation;
