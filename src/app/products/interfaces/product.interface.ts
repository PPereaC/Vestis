export interface Product {
  id: string;
  nombre: string;
  descripcion?: string;
  marca?: string;
  categoria?: string;
  precio_base?: number;
  imagen_url?: string;
  created_at?: string;
  cantidadVariantes?: number;
}
