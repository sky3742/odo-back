"use client";

import { signOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
      onClick={handleSignOut}
      type="button"
    >
      <LogOut size={14} />
      Sign out
    </button>
  );
};
