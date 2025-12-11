import { GlassPanel } from "@/components/shared";

/**
 * Auth Loading State
 *
 * Shown during route transitions in the auth route group.
 * Uses the same structure as auth pages for seamless loading experience.
 */
export default function AuthLoading() {
  return (
    <GlassPanel intensity="medium" className="p-0 overflow-hidden">
      <div className="p-6 space-y-4 animate-pulse">
        {/* Title */}
        <div className="h-8 w-48 mx-auto bg-muted rounded" />
        {/* Description */}
        <div className="h-4 w-64 mx-auto bg-muted rounded" />
        {/* Input fields */}
        <div className="space-y-2">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
        {/* Button */}
        <div className="h-10 w-full bg-muted rounded" />
        {/* Link */}
        <div className="h-4 w-40 mx-auto bg-muted rounded" />
      </div>
    </GlassPanel>
  );
}
