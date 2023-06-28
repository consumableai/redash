import React from "react";
import "./style.less";
export declare const DragHandle: any;
export declare const SortableContainerWrapper: any;
export declare const SortableElement: any;
declare type OwnProps = {
    disabled?: boolean;
    containerComponent?: React.ReactElement;
    containerProps?: any;
    children?: React.ReactNode;
};
declare type Props = OwnProps & typeof SortableContainer.defaultProps;
export declare function SortableContainer({ disabled, containerComponent, containerProps, children, ...wrapperProps }: Props): JSX.Element;
export declare namespace SortableContainer {
    var defaultProps: {
        disabled: boolean;
        containerComponent: string;
        containerProps: {};
        children: null;
    };
}
export {};
