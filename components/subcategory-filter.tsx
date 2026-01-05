"use client";

interface SubcategoryFilterProps {
  subcategories: string[];
  selectedSubcategory: string | null;
  onSelectSubcategory: (subcategory: string | null) => void;
}

export default function SubcategoryFilter({
  subcategories,
  selectedSubcategory,
  onSelectSubcategory,
}: SubcategoryFilterProps) {
  if (subcategories.length === 0) return null;

  return (
    <>

      <div className="mb-6 flex flex-wrap gap-2">
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() =>
              onSelectSubcategory(selectedSubcategory === sub ? null : sub)
            }
            className={`rounded-full px-4 py-2 text-sm transition-all color-red
            ${
              selectedSubcategory === sub
                ? "bg-primary text-primary-foreground "
                : "border border-border bg-card hover:bg-accent"
            }
            `}
          >
            {sub}
          </button>
        ))}
      </div>
    </>
  );
}
