/*!
 * React port of Cornelius library (based on v0.1 released under the MIT license)
 * Original library: http://restorando.github.io/cornelius
 */
import "./cornelius.less";
declare type OwnCorneliusProps = {
    data?: number[][];
    options?: {
        initialDate: any;
        timeInterval?: "daily" | "weekly" | "monthly" | "yearly";
        noValuePlaceholder?: string;
        rawNumberOnHover?: boolean;
        displayAbsoluteValues?: boolean;
        initialIntervalNumber?: number;
        maxColumns?: number;
        title?: string;
        timeColumnTitle?: string;
        peopleColumnTitle?: string;
        stageColumnTitle?: string;
        numberFormat?: string;
        percentFormat?: string;
        timeLabelFormat?: string;
        colors?: {
            min?: string;
            max?: string;
            steps?: number;
        };
    };
};
declare type CorneliusProps = OwnCorneliusProps & typeof Cornelius.defaultProps;
declare function Cornelius({ data, options }: CorneliusProps): JSX.Element | null;
declare namespace Cornelius {
    var defaultProps: {
        data: never[];
        options: {};
    };
}
export default Cornelius;
