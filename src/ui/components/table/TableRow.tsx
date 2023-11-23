import React from "react";

interface Props {
  columns: string | React.ReactNode;
  id: number;
}

const TableRow: React.FC<Props> = (props) => {
  const { columns, id } = props;

  return <tr key={`tbody-tr-tr-${id}`}>{columns}</tr>;
};

export default TableRow;
