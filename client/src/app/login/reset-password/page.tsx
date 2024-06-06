import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const ResetPassword = lazy(
  () => import("@/modules/auth/components/reset-password")
);

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center h-[100vh]">
        <Suspense fallback={<Spinner />}>
          <div>
            <ResetPassword />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
