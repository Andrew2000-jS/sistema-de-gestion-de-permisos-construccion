import { SingleOwner } from "@/modules";

function OwnerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <SingleOwner />
      </div>
    </main>
  );
}

export default OwnerPage;
