import { Plus } from "lucide-react";

export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center">
      <div className="mb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Drive less.
          <br />
          <span className="text-emerald-600">Keep more.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
          Track every odometer reading. Know exactly when to submit for maximum cashback.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 active:bg-emerald-800"
      >
        <Plus size={18} /> Add your first car
      </button>
    </section>
  );
}
