declare type OwnProps = {
    column: {
        name: string;
        title?: string;
        visible?: boolean;
        alignContent?: "left" | "center" | "right";
        displayAs?: any;
    };
    onChange?: (...args: any[]) => any;
};
declare type Props = OwnProps & typeof ColumnEditor.defaultProps;
declare function ColumnEditor({ column, onChange }: Props): JSX.Element;
declare namespace ColumnEditor {
    var defaultProps: {
        onChange: () => void;
    };
}
export default ColumnEditor;
