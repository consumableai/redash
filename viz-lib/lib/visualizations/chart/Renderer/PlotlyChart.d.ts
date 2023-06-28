export interface PlotlyChartProps {
    data: {
        rows: any[];
        columns: any[];
    };
    options: object;
}
declare function PlotlyChart({ options, data }: PlotlyChartProps): JSX.Element;
declare namespace PlotlyChart {
    var propTypes: {
        visualizationName: import("prop-types").Requireable<string>;
        data: import("prop-types").Validator<{
            columns: any[];
            rows: any[];
        }>;
        options: import("prop-types").Validator<object>;
        onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
    };
}
export default PlotlyChart;
