import { Permission } from "@/modules";

function PermissionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <Permission />
      </div>
    </main>
  );
}

export default PermissionPage;
