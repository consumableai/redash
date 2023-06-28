import "./index.less";
declare type OwnProps = {
    className?: string;
};
declare type Props = OwnProps & typeof TextAlignmentSelect.defaultProps;
declare function TextAlignmentSelect({ className, ...props }: Props): JSX.Element;
declare namespace TextAlignmentSelect {
    var defaultProps: {
        className: null;
    };
}
export default TextAlignmentSelect;
