import React from "react";
import Spinner from "./Spinner";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    onClick,
    disabled,
    rounded,
    type,
    danger,
    success,
    classsName,
    title,
    isLoading,
  } = props;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      title={title ?? "button"}
      // prettier-ignore
      className={classsName ?? `min-w-[120px] mt-0 text-sm ${disabled || danger ? "bg-red-400" : success ? "bg-emerald-500" : "bg-slate-500"}  text-white py-2 px-4 hover:bg-purple-600 ${rounded}`}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
