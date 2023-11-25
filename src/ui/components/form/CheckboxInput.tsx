import React from "react";

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="inline-flex items-center mt-1">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className="cursor-pointer form-checkbox h-5 w-5 accent-white hover:accent-slate-500 focus:accent-indigo-500"
      />
      <span className="ml-2 text-gray-700 font-semibold cursor-pointer">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
