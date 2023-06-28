declare function initJsonColumn(column: any): {
    ({ row }: any): JSX.Element;
    prepareData: (row: any) => {
        text: string;
        value: any;
    } | {
        text: any;
        value: undefined;
    };
};
declare namespace initJsonColumn {
    var friendlyName: string;
}
export default initJsonColumn;
