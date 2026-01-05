"use client";
//Aca estoy --> components\CategoryCards.tsx
import { urlFor } from "@/sanity/lib/image";

const CATEGORY_LABELS: Record<string, string> = {
  "munecos-3d": "Muñecos 3D",
  mascotas: "Mascotas",
  accesorios: "Accesorios",
  ceramica: "Cerámica",
};

interface CategoryCardsProps {
  categories: string[];
  images: Record<string, any>;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryCards({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryCardsProps) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(isActive ? null : category)}
            className={`rounded-xl border p-5 text-center font-semibold transition-all
              ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-lg"
                  : "border-border bg-card hover:bg-accent"
              }
            `}
          >
            {CATEGORY_LABELS[category] ?? category}
          </button>
        );
      })}
    </div>
  );
}
