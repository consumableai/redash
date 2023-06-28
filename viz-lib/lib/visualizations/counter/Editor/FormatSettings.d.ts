declare function FormatSettings({ options, data, onOptionsChange }: any): JSX.Element;
declare namespace FormatSettings {
    var propTypes: {
        visualizationName: import("prop-types").Requireable<string>;
        data: import("prop-types").Validator<{
            columns: any[];
            rows: any[];
        }>;
        options: import("prop-types").Validator<object>;
        onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
    };
}
export default FormatSettings;
