export default function prepareHeatmapData(seriesList: any, options: any): ({
    x: never[];
    y: never[];
    z: never[];
    type: string;
    name: string;
    colorscale: any;
} | {
    x: never[];
    y: never[];
    mode: string;
    hoverinfo: string;
    showlegend: boolean;
    text: never[];
    textfont: {
        color: never[];
    };
})[];
