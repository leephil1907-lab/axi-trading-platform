import TradingViewChart from "@/components/trading/TradingViewChart"
import type { Instrument } from "@/types"

export default function ChartPanel({ instrument }: { instrument?: Instrument }) {
  return <TradingViewChart instrument={instrument} />
}
