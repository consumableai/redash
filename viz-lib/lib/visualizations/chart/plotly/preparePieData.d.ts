export declare function getPieDimensions(series: any): {
    rows: number;
    cellsInRow: number;
    cellWidth: number;
    cellHeight: number;
    xPadding: number;
    yPadding: number;
};
export default function preparePieData(seriesList: any, options: any): {
    visible: boolean;
    values: any;
    labels: any;
    type: string;
    hole: number;
    marker: {
        colors: any[];
    };
    hoverinfo: any;
    text: never[];
    textinfo: string;
    textposition: string;
    textfont: {
        color: (string | null | undefined)[];
    };
    name: any;
    direction: any;
    domain: {
        x: number[];
        y: number[];
    };
    sourceData: Map<any, any>;
}[];
