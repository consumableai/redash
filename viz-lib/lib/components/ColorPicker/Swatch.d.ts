import "./swatch.less";
declare type OwnProps = {
    className?: string;
    style?: any;
    title?: string;
    color?: string;
    size?: number;
};
declare type Props = OwnProps & typeof Swatch.defaultProps;
declare function Swatch({ className, color, title, size, style, ...props }: Props): JSX.Element;
declare namespace Swatch {
    var defaultProps: {
        className: null;
        style: null;
        title: null;
        color: string;
        size: number;
    };
}
export default Swatch;
