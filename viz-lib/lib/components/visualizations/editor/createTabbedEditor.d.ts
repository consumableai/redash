export declare const UpdateOptionsStrategy: {
    replace: (existingOptions: any, newOptions: any) => any;
    shallowMerge: (existingOptions: any, newOptions: any) => any;
    deepMerge: (existingOptions: any, newOptions: any) => any;
};
declare type OwnProps = {
    tabs?: {
        key: string;
        title: string | ((...args: any[]) => any);
        isAvailable?: (...args: any[]) => any;
        component: (...args: any[]) => any;
    }[];
};
declare type Props = OwnProps & typeof TabbedEditor.defaultProps;
export declare function TabbedEditor({ tabs, options, data, onOptionsChange, ...restProps }: Props): JSX.Element;
export declare namespace TabbedEditor {
    var defaultProps: {
        tabs: never[];
    };
}
export default function createTabbedEditor(tabs: any): (props: any) => JSX.Element;
export {};
