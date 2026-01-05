// sanity/schemaTypes/product.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Muñecos 3D", value: "munecos-3d" },
          { title: "Cerámica", value: "ceramica" },
          { title: "Topper", value: "topper" },
          { title: "Mascotas", value: "mascotas" },
          { title: "Decoración", value: "decoracion" },
          { title: "Accesorios", value: "accesorios" },
          { title: "Llaveros", value: "llaveros" },
        ],
      },
    }),

    defineField({
      name: "subcategoria",
      title: "Subcategoría",
      type: "string",
      description: "Ej: Brain Rot, Pokémon, Perro, Gato, Guerreras K-pop, etc.",
    }),
    defineField({
      name: "imagen1",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagen2",
      title: "Imagen secundaria",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "precios",
      title: "Precios",
      type: "object",
      fields: [
        { name: "minorista", title: "Minorista", type: "number" },
        { name: "mayorista", title: "Mayorista", type: "number" },
        { name: "distribuidor", title: "Distribuidor", type: "number" },
      ],
    }),
  ],
});
