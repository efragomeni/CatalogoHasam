export const productsQuery = `
*[_type == "product"]{
  _id,
  nombre,
  descripcion,
  categoria,
  subcategoria,
  imagen1,
  imagen2,
  precios
}
`;
