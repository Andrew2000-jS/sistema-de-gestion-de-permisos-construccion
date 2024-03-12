import { verifyCode as VerifyCode } from "@/components";

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div>
          <VerifyCode />
        </div>
      </div>
    </main>
  );
}
