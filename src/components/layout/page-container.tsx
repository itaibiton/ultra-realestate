import { cn } from "@/lib/utils";

/** Container size options matching Tailwind's max-w classes */
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/** Tailwind container class mapping */
const containerClasses: Record<ContainerSize, string> = {
  sm: "max-w-2xl",   // 672px
  md: "max-w-4xl",   // 896px
  lg: "max-w-6xl",   // 1152px
  xl: "max-w-7xl",   // 1280px
  full: "max-w-full",
};

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Max-width size: sm, md, lg, xl, full */
  size?: ContainerSize;
  /** Add horizontal padding (default: true) */
  padding?: boolean;
  /** Center the container (default: true) */
  centered?: boolean;
  /** HTML element to render as */
  as?: "div" | "main" | "section" | "article";
}

/**
 * PageContainer - Consistent container for page content
 *
 * Provides standardized max-width, padding, and centering across the app.
 *
 * @example
 * // Default xl container with padding
 * <PageContainer>Content</PageContainer>
 *
 * @example
 * // Auth page with md container
 * <PageContainer size="md">Auth form</PageContainer>
 *
 * @example
 * // Full-width section
 * <PageContainer size="full" as="section">Full width</PageContainer>
 */
export function PageContainer({
  children,
  className,
  size = "xl",
  padding = true,
  centered = true,
  as: Component = "div",
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        containerClasses[size],
        centered && "mx-auto",
        padding && "px-6",
        className
      )}
    >
      {children}
    </Component>
  );
}
