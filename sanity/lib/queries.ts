export const productsQuery = `
*[_type == "product"] | order(_createdAt desc){
  _id,
  _createdAt,
  nombre,
  descripcion,
  categoria,
  subcategoria,
  imagen1,
  imagen2,
  precios
}
`;
