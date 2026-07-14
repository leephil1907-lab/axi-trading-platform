import { useState } from "react"
import { usePrices } from "@/hooks/usePrices"
import MarketWatch from "@/components/trading/MarketWatch"
import ChartPanel from "@/components/trading/ChartPanel"
import OrderPanel from "@/components/trading/OrderPanel"
import CurrentPositions from "@/components/trading/CurrentPositions"
import PositionTracker from "@/components/trading/PositionTracker"
import type { Instrument } from "@/types"

export default function TradingDashboard() {
  const { prices } = usePrices(1500)
  const [selected, setSelected] = useState<Instrument | undefined>(prices[0])

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-3.5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        <div className="lg:col-span-3 h-[300px] lg:h-full">
          <MarketWatch onSelect={setSelected} selectedSymbol={selected?.symbol} />
        </div>
        <div className="lg:col-span-6 flex flex-col gap-4 h-full">
          <div className="flex-1 min-h-0">
            <ChartPanel instrument={selected} />
          </div>
          <div className="h-[200px]">
            <CurrentPositions />
          </div>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-4 h-full">
          <div className="flex-1 min-h-0">
            <OrderPanel instrument={selected} />
          </div>
          <div className="h-auto">
            <PositionTracker />
          </div>
        </div>
      </div>
    </div>
  )
}
