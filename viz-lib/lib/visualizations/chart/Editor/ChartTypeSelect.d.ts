declare type OwnProps = {
    hiddenChartTypes?: any[];
};
declare type Props = OwnProps & typeof ChartTypeSelect.defaultProps;
declare function ChartTypeSelect({ hiddenChartTypes, ...props }: Props): JSX.Element;
declare namespace ChartTypeSelect {
    var defaultProps: {
        hiddenChartTypes: never[];
    };
}
export default ChartTypeSelect;
