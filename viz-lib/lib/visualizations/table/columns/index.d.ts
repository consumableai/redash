import initTextColumn from "./text";
import initNumberColumn from "./number";
import initDateTimeColumn from "./datetime";
import initBooleanColumn from "./boolean";
import initLinkColumn from "./link";
import initImageColumn from "./image";
import initJsonColumn from "./json";
declare const _default: {
    string: typeof initTextColumn;
    number: typeof initNumberColumn;
    datetime: typeof initDateTimeColumn;
    boolean: typeof initBooleanColumn;
    link: typeof initLinkColumn;
    image: typeof initImageColumn;
    json: typeof initJsonColumn;
};
export default _default;
