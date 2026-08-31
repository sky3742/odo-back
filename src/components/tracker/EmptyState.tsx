import { Plus } from "lucide-react";

export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <section>
      <div className="mb-8 max-w-xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#4f8c64]">
          Your garage
        </p>
        <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
          Drive less.
          <br />
          <span className="text-[#4f8c64]">Keep more.</span>
        </h1>
        <p className="mt-6 text-base leading-7 text-[#66736f] sm:text-lg">
          Keep every odometer reading in one place and know exactly when to submit next.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1d5c3b] px-5 py-3.5 font-bold text-white shadow-lg shadow-green-900/10 hover:bg-[#15472d] sm:w-auto"
      >
        <Plus size={19} /> Add your first car
      </button>
    </section>
  );
}
