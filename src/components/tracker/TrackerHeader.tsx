import { ArrowRight, Gauge } from "lucide-react";

export default function TrackerHeader() {
  return <header className="mb-10 flex items-center justify-between sm:mb-14">
    <div>
      <div className="flex items-center gap-3"><div className="rounded-2xl bg-[#c9edcf] p-2.5"><Gauge size={25} className="text-[#20613d]" /></div><span className="text-2xl font-black tracking-tight">OdoBack</span></div>
      <p className="mt-2 text-sm text-[#66736f]">Track your mileage. Maximise your cashback.</p>
    </div>
    <a href="https://www.etiqa.com.my/car/etiqa-cashback-by-driving-less" target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-[#20613d] hover:underline sm:block">Etiqa rules <ArrowRight size={15} className="ml-1 inline" /></a>
  </header>;
}
