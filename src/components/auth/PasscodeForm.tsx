"use client";

import { signInWithPasscode } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const PasscodeForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const passcode = String(formData.get("passcode") || "");

    const result = await signInWithPasscode(passcode);

    if (result.error) {
      setErrorMessage(result.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.replace("/");
    router.refresh();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium" htmlFor="passcode">
        Passcode
      </label>
      <input
        autoComplete="off"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        id="passcode"
        name="passcode"
        required
        type="password"
      />

      {errorMessage ? (
        <p className="text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};
