import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to check if the component is rendered on the client.
 * This is the modern React 18 way to avoid hydration mismatches
 * without triggering "setState in effect" lint warnings.
 */
export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
