import { SankeyDataType } from ".";
export declare type ExtendedSankeyDataType = Partial<SankeyDataType> & {
    nodes: any[];
    links: any[];
};
export default function initSankey(data: ExtendedSankeyDataType): (element: HTMLDivElement) => void;
