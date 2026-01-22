export interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  categoria: string;
  imagen_url?: string;
  stock?: number;
  created_at?: string;
}
