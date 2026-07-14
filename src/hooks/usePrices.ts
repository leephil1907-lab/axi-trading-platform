import { useState, useEffect, useCallback } from "react"
import { instruments as baseInstruments } from "@/lib/data"
import { Instrument } from "@/types"

export function usePrices(updateInterval = 2000) {
  const [prices, setPrices] = useState<Instrument[]>(baseInstruments)
  const [flashMap, setFlashMap] = useState<Record<string, "up" | "down" | null>>({})

  const simulatePrice = useCallback((inst: Instrument): Instrument => {
    const volatility = inst.category === "crypto" ? 0.008 : inst.category === "stock" ? 0.004 : 0.001
    const change = (Math.random() - 0.5) * volatility * inst.bid
    const newBid = Math.max(inst.bid + change, 0.0001)
    const newAsk = newBid + inst.spread
    const dayChange = inst.change + change
    const dayChangePercent = inst.changePercent + (change / inst.bid) * 100

    return {
      ...inst,
      bid: newBid,
      ask: newAsk,
      change: dayChange,
      changePercent: dayChangePercent,
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const newFlash: Record<string, "up" | "down" | null> = {}
        const updated = prev.map((inst) => {
          const updatedInst = simulatePrice(inst)
          if (updatedInst.bid > inst.bid) newFlash[inst.symbol] = "up"
          else if (updatedInst.bid < inst.bid) newFlash[inst.symbol] = "down"
          return updatedInst
        })
        setFlashMap(newFlash)
        setTimeout(() => setFlashMap({}), 600)
        return updated
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval, simulatePrice])

  const getPrice = useCallback((symbol: string) => {
    return prices.find((p) => p.symbol === symbol)
  }, [prices])

  return { prices, flashMap, getPrice }
}
