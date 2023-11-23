import React from "react";

interface Props {
  columns: string[] | React.ReactNode[];
}

const TableHeader: React.FC<Props> = (props) => {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          return (
            <th
              key={index}
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
