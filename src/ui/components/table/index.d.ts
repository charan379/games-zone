declare type TableProps = {
    render: boolean;
    headerRows: string[] | React.ReactNode[];
    bodyRows: React.ReactNode[];
};

declare type TableFooterProps = {
    messages: string;
    entriesCountProps: TableEntiresCountProps;
    isFirstPage: boolean;
    isLastPage: boolean;
    nextPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
    prevPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

declare type TableEntiresCountProps = {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    tableName: string;
};