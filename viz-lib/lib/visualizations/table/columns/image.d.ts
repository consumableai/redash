declare type Props = {
    column: {
        name: string;
        imageUrlTemplate?: string;
        imageWidth?: string;
        imageHeight?: string;
        imageTitleTemplate?: string;
    };
    onChange: (...args: any[]) => any;
};
declare function initImageColumn(column: any): {
    ({ row }: any): JSX.Element;
    prepareData: (row: any) => {};
};
declare namespace initImageColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initImageColumn;
