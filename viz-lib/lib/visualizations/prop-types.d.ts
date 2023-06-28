import PropTypes from "prop-types";
declare const VisualizationOptions: PropTypes.Requireable<object>;
declare type VisualizationOptions = any;
declare type Data = {
    columns: any[];
    rows: any[];
};
declare const Data: PropTypes.Requireable<Data>;
declare type VisualizationType = {
    id?: number;
    type: string;
    name: string;
    options: VisualizationOptions;
};
declare const VisualizationType: PropTypes.Requireable<VisualizationType>;
export { VisualizationType };
export declare const RendererPropTypes: {
    visualizationName: PropTypes.Requireable<string>;
    data: PropTypes.Validator<Data>;
    options: PropTypes.Validator<object>;
    onOptionsChange: PropTypes.Requireable<(...args: any[]) => any>;
};
export declare const EditorPropTypes: {
    visualizationName: PropTypes.Requireable<string>;
    data: PropTypes.Validator<Data>;
    options: PropTypes.Validator<object>;
    onOptionsChange: PropTypes.Validator<(...args: any[]) => any>;
};
