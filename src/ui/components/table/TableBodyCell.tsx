import React from "react";

interface Props {
  children: React.ReactNode | string;
}

const TableBodyCell: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
      {children}
    </td>
  );
};

export default TableBodyCell;
