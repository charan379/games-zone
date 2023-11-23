import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table: React.FC<TableProps> = (props) => {
  const { headerRows, bodyRows, render } = props;
  return (
    <table className="min-w-full leading-normal">
      {/* THead */}
      <TableHeader columns={headerRows} />
      {/* TBody */}
      {render ? (
        <tbody>
          {bodyRows?.map((row, index) => {
            return (
              <TableRow key={`tbody-tr-${index}`} id={index} columns={row} />
            );
          })}
        </tbody>
      ) : (
        ""
      )}
    </table>
  );
};

export default Table;
