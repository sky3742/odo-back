export default function Stats({ average, tier, cashback }: { average: number; tier: string; cashback: number }) {
  return <div className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-3"><Stat label="Average daily" value={`${average.toFixed(1)} km`} /><Stat label="Current tier" value={tier} accent /><Stat label="Cashback rate" value={`${cashback}%`} accent /></div>;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return <div className="bg-[#f3f7f1] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#66736f]">{label}</p><p className={`mt-2 text-xl font-black ${accent ? "text-[#28744a]" : ""}`}>{value}</p></div>;
}
