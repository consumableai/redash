export default function prepareData(rawData: any, options: any): {
    data: never[];
    initialDate: null;
} | {
    data: any;
    initialDate: Date;
};
