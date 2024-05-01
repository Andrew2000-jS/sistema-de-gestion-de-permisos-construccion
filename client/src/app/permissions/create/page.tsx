import { CreatePermission } from "@/modules";

function CreatePermissionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full items-center">
        <div>
          <CreatePermission />
        </div>
      </div>
    </main>
  );
}

export default CreatePermissionPage;
