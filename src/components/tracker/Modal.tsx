import type { ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-end justify-center bg-[#10231f]/75 p-0 sm:items-center sm:p-5"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl sm:pb-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="min-h-11 min-w-11 rounded-full p-2"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
