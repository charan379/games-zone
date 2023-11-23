import React from "react";
import TableLoadingSkeleton from "./TableLoadingSkeleton";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}
const TableHOC: React.FC<Props> = (props) => {
  const { children, loading } = props;

  if (loading) {
    return <TableLoadingSkeleton />;
  }
  
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default TableHOC;
