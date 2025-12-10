import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFormSkeleton />}>
      <SignInForm />
    </Suspense>
  );
}

function SignInFormSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg -z-10 h-full" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] rounded-full -z-10" />
      <div className="w-full max-w-md animate-pulse">
        <div className="h-10 w-40 mx-auto bg-muted rounded mb-8" />
        <div className="h-96 bg-muted rounded-xl" />
      </div>
    </div>
  );
}
