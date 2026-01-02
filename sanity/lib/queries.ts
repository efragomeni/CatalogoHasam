export const productsQuery = `
  *[_type == "product"] | order(nombre asc) {
    _id,
    nombre,
    descripcion,
    categoria,
    precios,
    imagen1,
    imagen2
  }
`
