declare type OwnProps = {
    value?: string | string[];
    availableColumns?: string[];
    type?: any;
    onChange?: (...args: any[]) => any;
};
declare type Props = OwnProps & typeof ColumnMappingSelect.defaultProps;
declare function ColumnMappingSelect({ value, availableColumns, type, onChange, areAxesSwapped }: Props): JSX.Element;
declare namespace ColumnMappingSelect {
    var defaultProps: {
        value: null;
        availableColumns: never[];
        type: null;
        onChange: () => void;
    };
    var MappingTypes: {
        x: {
            label: string;
        };
        y: {
            label: string;
            multiple: boolean;
        };
        series: {
            label: string;
        };
        yError: {
            label: string;
        };
        size: {
            label: string;
        };
        zVal: {
            label: string;
        };
    };
}
export default ColumnMappingSelect;
