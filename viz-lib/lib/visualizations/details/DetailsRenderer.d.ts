import "./details.less";
declare function DetailsRenderer({ data }: any): JSX.Element | null;
declare namespace DetailsRenderer {
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
export default DetailsRenderer;
