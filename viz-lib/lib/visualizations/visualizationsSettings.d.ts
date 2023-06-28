import React from "react";
declare type HelpTriggerProps = {
    title?: React.ReactNode;
    href: string;
    className?: string;
    children?: React.ReactNode;
};
declare function HelpTrigger({ title, href, className, children }: HelpTriggerProps): JSX.Element;
declare namespace HelpTrigger {
    var defaultValues: {
        title: null;
        className: null;
        children: null;
    };
}
declare function Link(props: any): JSX.Element;
export declare const visualizationsSettings: {
    HelpTriggerComponent: typeof HelpTrigger;
    LinkComponent: typeof Link;
    dateFormat: string;
    dateTimeFormat: string;
    integerFormat: string;
    floatFormat: string;
    booleanValues: string[];
    tableCellMaxJSONSize: number;
    allowCustomJSVisualizations: boolean;
    hidePlotlyModeBar: boolean;
    choroplethAvailableMaps: {};
};
export declare function updateVisualizationsSettings(options: any): void;
export {};
