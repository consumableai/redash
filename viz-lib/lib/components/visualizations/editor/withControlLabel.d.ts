import React from "react";
import "./control-label.less";
declare type OwnProps = {
    layout?: "vertical" | "horizontal";
    label?: React.ReactNode;
    labelProps?: any;
    disabled?: boolean;
    children?: React.ReactNode;
};
declare type Props = OwnProps & typeof ControlLabel.defaultProps;
export declare function ControlLabel({ layout, label, labelProps, disabled, children }: Props): JSX.Element | null;
export declare namespace ControlLabel {
    var defaultProps: {
        layout: string;
        label: null;
        disabled: boolean;
        children: null;
    };
}
export default function withControlLabel(WrappedControl: any): ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
export {};
