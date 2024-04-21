import { ResetPassword } from "@/modules";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center h-[100vh]">
        <div>
          <ResetPassword />
        </div>
      </div>
    </main>
  );
}
