import React from "react";
export declare const ErrorBoundaryContext: React.Context<{
    handleError: (error: any) => void;
    reset: () => void;
}>;
declare type OwnErrorMessageProps = {
    children?: React.ReactNode;
};
declare type ErrorMessageProps = OwnErrorMessageProps & typeof ErrorMessage.defaultProps;
export declare function ErrorMessage({ children }: ErrorMessageProps): JSX.Element;
export declare namespace ErrorMessage {
    var defaultProps: {
        children: string;
    };
}
declare type OwnErrorBoundaryProps = {
    renderError?: (...args: any[]) => any;
};
declare type ErrorBoundaryState = any;
declare type ErrorBoundaryProps = OwnErrorBoundaryProps & typeof ErrorBoundary.defaultProps;
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static defaultProps: {
        children: null;
        renderError: null;
    };
    state: {
        error: null;
    };
    handleError: (error: any) => void;
    reset: () => void;
    static getDerivedStateFromError(error: any): {
        error: any;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    render(): any;
}
export {};
