import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const LoginEmail = lazy(() => import("@/modules/auth/components/login-email"));

export default function LoginEmailPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Suspense fallback={<Spinner />}>
          <div>
            <LoginEmail />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
