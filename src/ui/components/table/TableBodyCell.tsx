import React from "react";

interface Props {
  children: React.ReactNode | string;
  renderStatus?: string;
}

const TableBodyCell: React.FC<Props> = (props) => {
  const { children, renderStatus } = props;

  switch (renderStatus) {
    case "new":
      return (
        <td className="px-5 py-2 border-b border-gray-200 bg-emerald-100 text-sm">
          {children}
        </td>
      );
    case "updated":
      return (
        <td className="px-5 py-2 border-b border-gray-200 bg-teal-100 text-sm">
          {children}
        </td>
      );
    case "deleted":
      return (
        <td className="px-5 py-2 border-b border-gray-200 bg-red-100 line-through text-sm">
          {children}
        </td>
      );

    default:
      return (
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          {children}
        </td>
      );
  }
};

export default TableBodyCell;
