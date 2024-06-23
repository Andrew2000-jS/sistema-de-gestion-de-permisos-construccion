import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const CreatePermission = lazy(
  () =>
    import(
      "@/modules/permission/components/create-permission/create-permission"
    )
);
function CreatePermissionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div>
          <Suspense fallback={<Spinner />}>
            <CreatePermission />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default CreatePermissionPage;
