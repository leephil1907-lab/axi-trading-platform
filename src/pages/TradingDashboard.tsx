import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MarketWatch from "@/components/trading/MarketWatch"
import ChartPanel from "@/components/trading/ChartPanel"
import OrderPanel from "@/components/trading/OrderPanel"
import CurrentPositions from "@/components/trading/CurrentPositions"
import type { Instrument } from "@/types"
import { instruments } from "@/lib/data"

export default function TradingDashboard() {
  const [params] = useSearchParams()
  const requested = params.get("symbol")
  const [selected, setSelected] = useState<Instrument | undefined>(() => instruments.find((item) => item.symbol === requested) || instruments[0])
  const selectedSymbol = useMemo(() => selected?.symbol, [selected])
  useEffect(() => { if (requested) { const next = instruments.find((item) => item.symbol === requested); if (next) setSelected(next) } }, [requested])

  return <div className="container mx-auto h-[calc(100vh-4rem)] min-h-[760px] px-3 py-3 lg:px-4"><div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-12">
    <div className="h-[360px] lg:col-span-3 lg:h-full"><MarketWatch onSelect={setSelected} selectedSymbol={selectedSymbol} /></div>
    <div className="flex min-h-0 flex-col gap-3 lg:col-span-6"><div className="min-h-[430px] flex-1"><ChartPanel instrument={selected} /></div><div className="h-[180px]"><CurrentPositions /></div></div>
    <div className="flex min-h-0 flex-col gap-3 lg:col-span-3"><div className="min-h-[430px] flex-1"><OrderPanel instrument={selected} /></div></div>
  </div></div>
}
