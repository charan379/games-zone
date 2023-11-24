import React from "react";
import SearchIcon from "../common/SearchIcon";

interface TimeInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rounded: string;
  required?: boolean;
  placeholder?: string;
}

const TimeInput: React.FC<TimeInputProps> = (props) => {
  const { label, name, value, onChange, rounded, required, placeholder } =
    props;

  return (
    <div className="relative">
      {label ? (
        <label className="block font-semibold mb-1" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        type="time"
        required={required}
        name={name}
        value={value}
        step={1}
        onChange={onChange}
        placeholder={placeholder ?? label}
        className={`cursor-pointer appearance-none ${rounded} border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1`}
      />
    </div>
  );
};

export default TimeInput;
