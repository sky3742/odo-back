import { CarFront, Edit3, Trash2 } from "lucide-react";
import type { Car } from "@/schemas/car";

export default function CarList({ cars, selectedId, onSelect, onEdit, onDelete }: { cars: Car[]; selectedId: string | null; onSelect: (id: string) => void; onEdit: (car: Car) => void; onDelete: (id: string) => void }) {
  return <div className="mb-5 border-y border-[#dce5df]">{cars.map((item) => <div data-testid="car-row" key={item.id} className={`flex items-center gap-2 border-b border-[#e7eee8] p-3 last:border-0 sm:gap-3 sm:p-4 ${item.id === selectedId ? "bg-[#edf7ed]" : ""}`}><button onClick={() => onSelect(item.id)} className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left"><CarFront size={19} className="shrink-0 text-[#4f8c64]" /><span className="truncate font-semibold">{item.identifier}</span></button><button onClick={() => onEdit(item)} title="Edit car" className="min-h-11 min-w-11 rounded-full p-2 text-[#66736f] hover:bg-white"><Edit3 size={17} /></button><button onClick={() => onDelete(item.id)} title="Delete car" className="min-h-11 min-w-11 rounded-full p-2 text-[#a04e45] hover:bg-[#fff1ee]"><Trash2 size={17} /></button></div>)}</div>;
}
