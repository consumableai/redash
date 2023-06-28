declare type Props = {
    column: {
        name: string;
        booleanValues?: string[];
    };
    onChange: (...args: any[]) => any;
};
declare function initBooleanColumn(column: any): {
    ({ row }: any): any;
    prepareData: (row: any) => {
        text: any;
    };
};
declare namespace initBooleanColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initBooleanColumn;
