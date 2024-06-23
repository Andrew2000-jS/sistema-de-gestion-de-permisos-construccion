import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const Owners = lazy(() => import("@/modules/owners/components/owners"));

function OwnersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Suspense fallback={<Spinner />}>
          <Owners />
        </Suspense>
      </div>
    </main>
  );
}

export default OwnersPage;
