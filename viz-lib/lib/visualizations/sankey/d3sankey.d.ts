export interface LinkType {
    id: number;
    name: string;
    color: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
    source: SourceTargetType;
    target: SourceTargetType;
}
export declare type SourceTargetType = {
    sourceLinks: Array<LinkType>;
    targetLinks: Array<LinkType>;
};
export declare type NodeType = LinkType & SourceTargetType;
export interface D3SankeyType {
    nodeWidth: (...args: any[]) => any;
    nodeHeight: (...args: any[]) => any;
    nodePadding: (...args: any[]) => any;
    nodes: (...args: any[]) => any[];
    link: (...args: any[]) => any;
    links: (...args: any[]) => any[];
    size: (...args: any[]) => any;
    layout: (...args: any[]) => any;
    relayout: (...args: any[]) => any;
}
export declare type DType = {
    sy: number;
    ty: number;
    value: number;
    source: LinkType;
    target: LinkType;
} & LinkType;
declare function Sankey(): D3SankeyType;
export default Sankey;
