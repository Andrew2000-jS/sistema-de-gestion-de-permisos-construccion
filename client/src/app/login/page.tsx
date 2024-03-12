import Login from "@/components/auth/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div className="leading-10">
          <h1 className="text-3xl">¡Bienvenido!</h1>
          <p>Por favor, inicia sesión para continuar.</p>
        </div>
        <div>
          <Login />
        </div>
      </div>
    </main>
  );
}
