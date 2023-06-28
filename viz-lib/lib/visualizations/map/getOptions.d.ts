export declare type LeafletBaseIconType = "marker" | "rectangle" | "circle" | "rectangle-dot" | "circle-dot" | "doughnut";
export interface MapOptionsType {
    latColName: string;
    lonColName: string;
    classify: any;
    groups: Record<string, any>;
    mapTileUrl: string;
    clusterMarkers: boolean;
    customizeMarkers: boolean;
    iconShape: LeafletBaseIconType;
    iconFont: LeafletBaseIconType;
    foregroundColor: string;
    backgroundColor: string;
    borderColor: string;
    bounds: any;
    tooltip: {
        enabled: boolean;
        template: string;
    };
    popup: {
        enabled: boolean;
        template: string;
    };
}
export default function getOptions(options: MapOptionsType): MapOptionsType;
