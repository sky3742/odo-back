import { getSession } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { PasscodeForm } from "@/components/auth/PasscodeForm";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-bold">OdoBack</h1>
        <p className="mb-6 text-sm text-gray-500">Enter your passcode to continue.</p>
        <PasscodeForm />
      </div>
    </div>
  );
}
