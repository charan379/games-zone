import React from "react";

interface Props {
  children: React.ReactNode;
  label: string;
}

const ModalLayout: React.FC<Props> = (props) => {
  const { children, label } = props;

  return (
    <div className="relative py-5 sm:w-96 mx-auto text-center">
      <span className="text-2xl font-bold">{label}</span>
      <div className="mt-4 bg-white shadow-md rounded-lg text-left">
        <div className="h-2 bg-slate-400 rounded-t-md"></div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
