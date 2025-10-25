export type ClientType = "minorista" | "mayorista" | "distribuidor"

export interface Client {
  id: string
  nombre: string
  tipo: ClientType
  descuento: number
}

export interface Product {
  id: number
  nombre: string
  descripcion: string
  imagen1: string
  imagen2: string
  precios: {
    minorista: number
    mayorista: number
    distribuidor: number
  }
  categoria: string
}

export interface CartItem {
  productId: number
  quantity: number
}
