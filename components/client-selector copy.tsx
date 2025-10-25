"use client"

import { X, Users, Building2, Warehouse } from "lucide-react"
import type { ClientType } from "@/types"

interface ClientSelectorProps {
  isOpen: boolean
  currentType: ClientType
  onSelect: (type: ClientType) => void
  onClose: () => void
}

const clientTypes = [
  {
    type: "minorista" as ClientType,
    label: "Minorista",
    description: "Compras individuales",
    discount: 0,
    icon: Users,
  },
  {
    type: "mayorista" as ClientType,
    label: "Mayorista",
    description: "Compras al por mayor",
    discount: 20,
    icon: Building2,
  },
  {
    type: "distribuidor" as ClientType,
    label: "Distribuidor",
    description: "Distribución comercial",
    discount: 32,
    icon: Warehouse,
  },
]

export default function ClientSelector({ isOpen, currentType, onSelect, onClose }: ClientSelectorProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      {/* <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} /> */}

      {/* Modal */}
      {/* <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Tipo de Cliente</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div> */}

        {/* <p className="mb-6 text-sm text-muted-foreground">
          Selecciona tu tipo de cliente para ver los precios correspondientes
        </p> */}

        {/* <div className="space-y-3">
          {clientTypes.map(({ type, label, description, discount, icon: Icon }) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                currentType === type
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg p-2 ${
                    currentType === type ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">{label}</h3>
                    {discount > 0 && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div> */}
      {/* </div> */}
    </>
  )
}
