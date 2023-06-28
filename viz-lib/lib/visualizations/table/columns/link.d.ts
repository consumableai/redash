declare type Props = {
    column: {
        name: string;
        linkUrlTemplate?: string;
        linkTextTemplate?: string;
        linkTitleTemplate?: string;
        linkOpenInNewTab?: boolean;
    };
    onChange: (...args: any[]) => any;
};
declare function initLinkColumn(column: any): {
    ({ row }: any): JSX.Element;
    prepareData: (row: any) => {};
};
declare namespace initLinkColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initLinkColumn;
