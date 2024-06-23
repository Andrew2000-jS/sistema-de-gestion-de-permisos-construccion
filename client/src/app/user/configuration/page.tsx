import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";

const Configuration = lazy(
  () => import("@/modules/user/components/configuration/configuration")
);

function ConfigurationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div>
          <Suspense fallback={<Spinner />}>
            <Configuration />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default ConfigurationPage;
