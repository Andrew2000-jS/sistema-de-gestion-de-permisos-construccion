import { lazy, Suspense } from "react";
import { Spinner } from "@/lib";
import Image from "next/image";

const Register = lazy(() => import("@/modules/auth/components/register"));

export default function RegiserPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<Spinner />}>
        <div className="flex justify-around w-full items-center h-[100vh]">
          <div className="flex flex-col">
            <Image
              src={"/logo-alcaldia-2.png"}
              alt="logo alcaldia"
              height={250}
              width={250}
              className="mb-2"
            />
            <div className="leading-10">
              <h1 className="text-3xl">Información básica</h1>
              <p>Tus datos serán guardados de forma segura</p>
            </div>
          </div>
          <div>
            <Register />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
