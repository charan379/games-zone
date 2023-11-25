import React from "react";

interface Props {
  children?: React.ReactNode;
  label: string;
  value?: string;
}

const KeyValuePair: React.FC<Props> = (props) => {
  const { label, value, children } = props;
  return (
    <div className="flex flex-row items-center flex-wrap gap-1 sm:gap-2 text-sm cursor-pointer">
      <span className="font-semibold text-left">{label}</span>
      <span>:</span>
      <span>{value ?? children ?? "No Data"}</span>
    </div>
  );
};

export default KeyValuePair;
