export declare function darkenColor(color: any): string;
export declare function createNumberFormatter(format: any, placeholder: any): (value: any) => any;
export declare function prepareData(data: any, keyColumn: any, valueColumn: any): {};
export declare function prepareFeatureProperties(feature: any, valueFormatted: any, data: any, targetField: any): any;
export declare function getValueForFeature(feature: any, data: any, targetField: any): any;
export declare function getColorByValue(value: any, limits: any, colors: any, defaultColor: any): any;
export declare function createScale(features: any, data: any, options: any): {
    limits: any[];
    colors: any[];
    legend: {
        color: any;
        limit: any;
    }[];
};
