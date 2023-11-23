import React from "react";

interface Props {
  children: React.ReactNode;
  show: boolean;
}
const ModalHOC: React.FC<Props> = (props) => {
  const { children, show } = props;

  if (!show) {
    return;
  }

  return (
    <div className="h-full w-full fixed z-[1009] bg-transparent bg-slate-400 backdrop-blur-sm rounded-lg top-0 left-0 flex flex-wrap flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default ModalHOC;
