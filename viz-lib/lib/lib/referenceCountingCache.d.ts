export default function createReferenceCountingCache({ cleanupDelay }?: {
    cleanupDelay?: number | undefined;
}): {
    get: (key: any, getter: any) => any;
    release: (key: any) => void;
};
