import Renderer from "./Renderer";
import Editor from "./Editor";
export interface SankeyDataType {
    columns: {
        name: string;
        friendly_name: string;
        type: "integer";
    }[];
    rows: {
        value: number;
        [name: string]: number | string | null;
    }[];
}
declare const _default: {
    type: string;
    name: string;
    getOptions: (options: {}) => {};
    Renderer: typeof Renderer;
    Editor: typeof Editor;
    defaultRows: number;
};
export default _default;
