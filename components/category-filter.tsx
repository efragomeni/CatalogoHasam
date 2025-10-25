"use client"

import { useState } from "react"
import { ChevronDown, Grid3x3, X } from "lucide-react"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (category: string | null) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-card-foreground transition-all hover:bg-accent hover:text-accent-foreground"
      >
        <Grid3x3 className="h-4 w-4" />
        <span>{selectedCategory || "Todas las categorías"}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg">
            <div className="p-2">
              {/* All Categories Option */}
              <button
                onClick={() => handleSelect(null)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground"
                    : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span>Todas las categorías</span>
                {selectedCategory === null && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
              </button>

              {/* Divider */}
              <div className="my-2 h-px bg-border" />

              {/* Category Options */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <span>{category}</span>
                  {selectedCategory === category && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Active Filter Badge */}
      {selectedCategory && (
        <button
          onClick={() => onSelectCategory(null)}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
