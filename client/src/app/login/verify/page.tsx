import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const VerifyCode = lazy(() => import("@/modules/auth/components/verify-code"));

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Suspense fallback={<Spinner />}>
          <div>
            <VerifyCode />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
