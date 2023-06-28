declare function box(): {
    (g: any): void;
    width(x: any): number | any;
    height(x: any): number | any;
    tickFormat(x: any): any;
    duration(x: any): number | any;
    domain(x: any): any;
    value(x: any): NumberConstructor | any;
    whiskers(x: any): typeof boxWhiskers | any;
    quartiles(x: any): typeof boxQuartiles | any;
};
declare function boxWhiskers(d: any): number[];
declare function boxQuartiles(d: any): (number | undefined)[];
export default box;
