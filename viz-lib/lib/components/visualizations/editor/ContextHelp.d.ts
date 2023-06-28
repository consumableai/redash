import React from "react";
import "./context-help.less";
declare type OwnContextHelpProps = {
    icon?: React.ReactNode;
    children?: React.ReactNode;
};
declare type ContextHelpProps = OwnContextHelpProps & typeof ContextHelp.defaultProps;
declare function ContextHelp({ icon, children, ...props }: ContextHelpProps): JSX.Element;
declare namespace ContextHelp {
    var defaultProps: {
        icon: null;
        children: null;
    };
    var defaultIcon: JSX.Element;
    var NumberFormatSpecs: () => JSX.Element;
    var DateTimeFormatSpecs: () => JSX.Element;
}
export default ContextHelp;
