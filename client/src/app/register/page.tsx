import Register from "@/components/auth/register";

export default function RegiserPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div className="leading-10">
          <h1 className="text-3xl">Información básica</h1>
          <p>Tus datos serán guardados de forma segura</p>
        </div>
        <div>
          <Register />
        </div>
      </div>
    </main>
  );
}
