type TechfestErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type TechfestEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: TechfestErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __techfestEvents?: TechfestEvents;
  }
}

export function reportTechfestError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__techfestEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
