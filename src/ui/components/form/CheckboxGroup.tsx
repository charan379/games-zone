"use client";

import { useEffect, useState } from "react";
import Checkbox from "./CheckboxInput";

interface Props {
  onChange: (obj: object) => void;
  options: { label: string; value: string }[];
  label: string;
  rounded?: string;
}

const CheckboxGroup: React.FC<Props> = (props) => {
  const { onChange, options, label, rounded } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [value]: !prevCheckedItems[value],
    }));
  };

  useEffect(() => {
    onChange(checkedItems);
    return () => {};
  }, [checkedItems]);

  return (
    <div className="z-10 relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className={`${rounded} inline-flex justify-center w-full px-4 py-3 h-full border border-slate-700 text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500`}
            onClick={handleToggleDropdown}
          >
            {label}
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((item) => (
              <label
                key={item.value}
                className="block px-4 py-2 text-sm text-gray-700"
              >
                <Checkbox
                  label={item.label}
                  value={item.value}
                  checked={checkedItems[item.value] || false}
                  onChange={() => handleCheckboxChange(item.value)}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckboxGroup;
