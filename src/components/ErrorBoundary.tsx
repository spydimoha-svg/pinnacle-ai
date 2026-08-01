import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * A wall around a subtree that a model's output can reach.
 *
 * The 3D stage is built from numbers the LLM chose. three.js throws on bad
 * geometry, and a WebGL context can fail to create at all on the cheap laptops
 * and Android tablets these students use. Without a boundary, either one takes
 * out the whole React tree: the student loses the entire page, not just the
 * picture, and the only way back is a manual reload.
 *
 * A lazily-imported chunk that fails to load throws in the same place, and
 * Suspense does not catch that either — it catches pending promises, not
 * rejected ones.
 */
interface Props {
  children: ReactNode;
  /** Shown in place of the subtree. Keep it small and unalarming. */
  fallback?: ReactNode;
}

interface State {
  failed: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Logged, not surfaced: a student does not need a stack trace, but this is
    // exactly the failure we would otherwise never hear about.
    console.error("Subtree failed:", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <p className="text-xs text-dim italic my-2">
            (That visual wouldn't load on this device — the lesson carries on without it.)
          </p>
        )
      );
    }
    return this.props.children;
  }
}
