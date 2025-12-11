import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";
import { GlassPanel } from "@/components/shared";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFormSkeleton />}>
      <SignInForm />
    </Suspense>
  );
}

function SignInFormSkeleton() {
  return (
    <>
      <GlassPanel intensity="medium" className="p-0 overflow-hidden">
        <div className="p-6 space-y-4 animate-pulse">
          {/* Title */}
          <div className="h-8 w-48 mx-auto bg-muted rounded" />
          {/* Description */}
          <div className="h-4 w-64 mx-auto bg-muted rounded" />
          {/* Email input */}
          <div className="space-y-2">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
          {/* Password input */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
          {/* Button */}
          <div className="h-10 w-full bg-muted rounded" />
          {/* Sign up link */}
          <div className="h-4 w-40 mx-auto bg-muted rounded" />
        </div>
      </GlassPanel>
      {/* Terms */}
      <div className="mt-6 flex justify-center">
        <div className="h-3 w-64 bg-muted rounded animate-pulse" />
      </div>
    </>
  );
}
