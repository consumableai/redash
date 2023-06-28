import React from "react";
import { RendererPropTypes } from "@/visualizations/prop-types";
declare type Props = {
    type: string;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
} & typeof RendererPropTypes;
export default function Renderer({ type, data, options: optionsProp, visualizationName, addonBefore, addonAfter, ...otherProps }: Props): JSX.Element;
export {};
