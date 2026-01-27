export interface Product {
    id: number;
    nombre: string;
    descripcion?: string;
    precio_base: number;
    precio_oferta?: number;
    tiene_oferta: boolean;
    imagen_principal_url?: string;
    categoria?: string;
    marca?: string;
    color_default?: string;
    genero?: 'Hombre' | 'Mujer' | 'Unisex' | 'Niños';
    fecha_creacion: string;
    cantidadVariantes?: number;
}

