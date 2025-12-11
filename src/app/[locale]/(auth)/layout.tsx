import { Globe } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Auth Layout - Shared layout for all authentication pages
 *
 * Provides:
 * - Centered full-screen layout
 * - Grid background pattern
 * - Blue blur orb effect
 * - GlobalNest logo
 * - Max-width container for content
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg -z-10 h-full" />
      <div className="auth-blur-orb auth-blur-orb-blue" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Globe className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-semibold">GlobalNest</span>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
