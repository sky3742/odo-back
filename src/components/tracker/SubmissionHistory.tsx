import { Trash2 } from "lucide-react";
import { getStats } from "@/services/car";
import type { Car } from "@/schemas/car";

const formatDate = (value: string) => new Intl.DateTimeFormat("en-MY", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));

export default function SubmissionHistory({ car, onDelete }: { car: Car; onDelete: (id: string) => void }) {
  const entries = [...car.submissions].reverse();
  return <div className="mt-6 sm:mt-8"><p className="mb-3 text-sm font-bold">Submission history</p>{entries.length ? <div className="divide-y divide-[#e7eee8]">{entries.map((entry, index) => <div key={entry.id} className="flex items-center gap-3 py-3 text-sm"><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><span className="text-[#66736f]">{formatDate(entry.date)}</span><span className="text-right font-bold">{entry.odometer.toLocaleString()} km</span></div>{index < entries.length - 1 && <p className="mt-1 text-right text-xs text-[#4f8c64]">{getStats(car.submissions[car.submissions.length - 2 - index], entry).average.toFixed(1)} km/day average</p>}</div><button onClick={() => onDelete(entry.id)} title="Delete submission" className="min-h-11 min-w-11 rounded-full p-2 text-[#a04e45] hover:bg-[#fff1ee]"><Trash2 size={17} /></button></div>)}</div> : <p className="text-sm text-[#66736f]">No readings yet.</p>}</div>;
}
