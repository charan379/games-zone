import React from "react";

const TableEntiresCount: React.FC<TableEntiresCountProps> = (props) => {
  const { pageNumber, pageSize, totalElements, tableName } = props;
  return (
    <span className="text-xs xs:text-sm text-gray-900">
      Showing {pageNumber * pageSize + 1} to{" "}
      {Math.min((pageNumber + 1) * pageSize, totalElements)} of {totalElements}{" "}
      {tableName}
    </span>
  );
};

export default TableEntiresCount;
