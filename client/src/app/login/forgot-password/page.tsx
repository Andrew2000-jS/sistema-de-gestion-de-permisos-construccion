import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const ForgotPassword = lazy(
  () => import("@/modules/auth/components/forgot-password")
);

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center h-[100vh]">
        <Suspense fallback={<Spinner />}>
          <div>
            <ForgotPassword />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
