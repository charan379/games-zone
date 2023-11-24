import React from "react";

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
  } = props;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      title={title ?? "button"}
      // prettier-ignore
      className={classsName ?? `mt-4 text-sm ${disabled || danger ? "bg-red-400" : success ? "bg-emerald-500" : "bg-slate-500"}  text-white py-2 px-4 hover:bg-purple-600 ${rounded}`}
    >
      {children}
    </button>
  );
};

export default Button;
