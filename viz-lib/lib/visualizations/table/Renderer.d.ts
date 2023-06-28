import "./renderer.less";
declare function Renderer({ options, data }: any): JSX.Element | null;
declare namespace Renderer {
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
export default Renderer;
