import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const Permission = lazy(
  () => import("@/modules/permission/components/permission")
);

function PermissionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Suspense fallback={<Spinner />}>
          <Permission />
        </Suspense>
      </div>
    </main>
  );
}

export default PermissionPage;
