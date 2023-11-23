import React from "react";
import Button from "../common/Button";
import TableEntiresCount from "./TableEntiresCount";

const TableFooter: React.FC<TableFooterProps> = (props) => {
  const {
    messages,
    entriesCountProps,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
  } = props;

  return (
    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
      <span className="text-lg xs:text-base text-gray-900">{messages}</span>
      <TableEntiresCount {...entriesCountProps} />
      <div className="inline-flex mt-2 xs:mt-0">
        <Button rounded="rounded-l" disabled={isFirstPage} onClick={prevPage}>
          Prev
        </Button>
        <Button rounded="rounded-r" disabled={isLastPage} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableFooter;
