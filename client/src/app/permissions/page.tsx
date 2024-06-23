import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const Permissions = lazy(
  () => import("@/modules/permission/components/permissions")
);

function PermissionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div>
          <Suspense fallback={<Spinner />}>
            <Permissions />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default PermissionsPage;
