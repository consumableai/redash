declare type Props = {
    column: {
        name: string;
        allowHTML?: boolean;
        highlightLinks?: boolean;
    };
    onChange: (...args: any[]) => any;
};
declare function initTextColumn(column: any): {
    ({ row }: any): string | JSX.Element;
    prepareData: (row: any) => {
        text: string;
    };
};
declare namespace initTextColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initTextColumn;
