import React from "react";
import ColorInput from "./Input";
import "./index.less";
declare type OwnProps = {
    color?: string;
    placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
    presetColors?: string[] | {
        [key: string]: string;
    };
    presetColumns?: number;
    interactive?: boolean;
    triggerProps?: any;
    children?: React.ReactNode;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onChange?: (...args: any[]) => any;
};
declare type Props = OwnProps & typeof ColorPicker.defaultProps;
declare function ColorPicker({ color, placement, presetColors, presetColumns, interactive, children, onChange, triggerProps, addonBefore, addonAfter, }: Props): JSX.Element;
declare namespace ColorPicker {
    var defaultProps: {
        color: string;
        placement: string;
        presetColors: null;
        presetColumns: number;
        interactive: boolean;
        triggerProps: {};
        children: null;
        addonBefore: null;
        addonAfter: null;
        onChange: () => void;
    };
    var Input: typeof ColorInput;
    var Swatch: typeof import("./Swatch").default;
    var Label: typeof import("./Label").default;
}
export default ColorPicker;
