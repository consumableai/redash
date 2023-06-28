import "./json-view-interactive.less";
declare type OwnJsonViewInteractiveProps = {
    value?: any;
};
declare type JsonViewInteractiveProps = OwnJsonViewInteractiveProps & typeof JsonViewInteractive.defaultProps;
declare function JsonViewInteractive({ value }: JsonViewInteractiveProps): JSX.Element;
declare namespace JsonViewInteractive {
    var defaultProps: {
        value: undefined;
    };
}
export default JsonViewInteractive;
