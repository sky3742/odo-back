import { Gauge } from "lucide-react";

export default function TrackerHeader() {
  return (
    <header className="mb-8 flex items-center justify-between sm:mb-12">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
          <Gauge size={18} className="text-emerald-700" />
        </div>
        <span className="text-lg font-bold tracking-tight">OdoBack</span>
      </div>
      <a
        href="https://www.etiqa.com.my/car/etiqa-cashback-by-driving-less"
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-emerald-700 hover:underline"
      >
        Etiqa rules
      </a>
    </header>
  );
}
