declare function CustomPlotlyChart({ options, data }: any): JSX.Element;
declare namespace CustomPlotlyChart {
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
export default CustomPlotlyChart;
