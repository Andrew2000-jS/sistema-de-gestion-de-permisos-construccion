import { Spinner } from "@/lib";
import { lazy, Suspense } from "react";

const Owner = lazy(() => import("@/modules/owners/components/owner"));

function OwnerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Suspense fallback={<Spinner />}>
          <Owner />
        </Suspense>
      </div>
    </main>
  );
}

export default OwnerPage;
