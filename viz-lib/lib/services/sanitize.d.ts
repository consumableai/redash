/// <reference types="trusted-types" />
import DOMPurify from "dompurify";
export { DOMPurify };
declare const _default: {
    (source: string | Node): string;
    (source: string | Node, config: DOMPurify.Config & {
        RETURN_TRUSTED_TYPE: true;
    }): TrustedHTML;
    (source: string | Node, config: DOMPurify.Config & {
        RETURN_DOM_FRAGMENT?: false | undefined;
        RETURN_DOM?: false | undefined;
    }): string;
    (source: string | Node, config: DOMPurify.Config & {
        RETURN_DOM_FRAGMENT: true;
    }): DocumentFragment;
    (source: string | Node, config: DOMPurify.Config & {
        RETURN_DOM: true;
    }): HTMLElement;
    (source: string | Node, config: DOMPurify.Config): string | HTMLElement | DocumentFragment;
};
export default _default;
