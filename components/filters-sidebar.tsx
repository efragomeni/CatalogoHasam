"use client";

import { X } from "lucide-react";

interface FiltersSidebarProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  categories: string[];
  subcategories: string[];
  onSelectCategory: (category: string | null) => void;
  onSelectSubcategory: (subcategory: string | null) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  "munecos-3d": "Muñecos 3D",
  mascotas: "Mascotas",
  accesorios: "Accesorios",
  ceramica: "Cerámica",
  llaveros: "Llaveros",
  decoracion: "Decoración",
  topper: "Topper",
  distribuidor: "Distribuidor",
};

export default function FiltersSidebar({
  selectedCategory,
  selectedSubcategory,
  categories,
  subcategories,
  onSelectCategory,
  onSelectSubcategory,
}: FiltersSidebarProps) {
  const hasFilters = selectedCategory || selectedSubcategory;

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="sticky top-20 space-y-6 p-4">
        {/* Category Filter */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-gray-900">Categorías</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    onSelectCategory(selectedCategory === cat ? null : cat)
                  }
                  className="h-4 w-4 rounded border-gray-300 accent-yellow-400"
                />
                <span className="text-sm text-gray-700">
                  {CATEGORY_LABELS[cat] ?? cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {selectedCategory && subcategories.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Subcategorías</h3>
              {selectedSubcategory && (
                <button
                  onClick={() => onSelectSubcategory(null)}
                  className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                  title="Limpiar"
                >
                  <X className="h-3 w-3 text-gray-600" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              {subcategories.map((sub) => (
                <label
                  key={sub}
                  className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubcategory === sub}
                    onChange={() =>
                      onSelectSubcategory(
                        selectedSubcategory === sub ? null : sub
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-yellow-400"
                  />
                  <span className="text-sm text-gray-700">{sub}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={() => {
              onSelectCategory(null);
              onSelectSubcategory(null);
            }}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </aside>
  );
}
