import { Owners } from "@/modules";

function OwnersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Owners />
      </div>
    </main>
  );
}

export default OwnersPage;
