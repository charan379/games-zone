import React from "react";

interface DateInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rounded: string;
  required?: boolean;
  placeholder?: string;
}

const DateInput: React.FC<DateInputProps> = (props) => {
  const { label, name, value, onChange, rounded, required, placeholder } =
    props;

  let formattedDate;

  const originalDate = value;

  if (originalDate === "today") {
    const d = new Date(Date.now());
    formattedDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  } else {
    formattedDate = originalDate;
  }

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
        type="date"
        required={required}
        name={name}
        value={formattedDate}
        step={1}
        onChange={onChange}
        placeholder={placeholder ?? label}
        className={`cursor-pointer appearance-none max-h-[38px] ${rounded} border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:bg-white focus:border-gray-500`}
      />
    </div>
  );
};

export default DateInput;
