import React from "react";
import SearchIcon from "../common/SearchIcon";

interface Props {
  label?: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rounded: string;
  type: "Search" | "Normal";
  required?: boolean;
  placeholder?: string;
}

const TextInput: React.FC<Props> = (props) => {
  const { label, name, value, onChange, type, required, rounded, placeholder } =
    props;

  return (
    <div className="relative">
      {type === "Search" ? (
        <SearchIcon />
      ) : (
        <label className="block font-semibold mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type="text"
        required
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? label}
        className={`cursor-pointer appearance-none ${rounded} border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600`}
      />
    </div>
  );
};

export default TextInput;
