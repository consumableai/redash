import "./input.less";
declare type OwnProps = {
    color?: string;
    presetColors?: string[] | {
        [key: string]: string;
    };
    presetColumns?: number;
    onChange?: (...args: any[]) => any;
    onPressEnter?: (...args: any[]) => any;
};
declare type Props = OwnProps & typeof Input.defaultProps;
declare function Input({ color, presetColors, presetColumns, onChange, onPressEnter }: Props): JSX.Element;
declare namespace Input {
    var defaultProps: {
        color: string;
        presetColors: null;
        presetColumns: number;
        onChange: () => void;
        onPressEnter: () => void;
    };
}
export default Input;
