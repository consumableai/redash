export declare function prepareColumns(columns: any, searchInput: any, orderBy: any, onOrderByChange: any): {
    key: any;
    dataIndex: string;
    align: any;
    sorter: {
        multiple: number;
    };
    sortOrder: any;
    title: JSX.Element;
    onHeaderCell: () => {
        className: string;
        onClick: (event: any) => any;
    };
}[];
export declare function initRows(rows: any): {
    key: string;
    record: any;
}[];
export declare function filterRows(rows: any, searchTerm: any, searchColumns: any): any;
export declare function sortRows(rows: any, orderBy: any): any;
