import { Injectable, inject } from '@angular/core';
import { SupabaseClientService } from '../../core/services/supabase-client.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ServicioProductos {
    private supabaseClient = inject(SupabaseClientService);

    async obtenerProductos(): Promise<Product[]> {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select(`
                *,
                variantes(id)
            `);

        if (error) {
            console.error('Error obteniendo productos:', error);
            return [];
        }

        // Mapear los productos con la imagen principal y cantidad de variantes
        return (data || []).map(product => ({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            marca: product.marca,
            color_default: product.color_default,
            categoria: product.categoria,
            precio_base: product.precio_base,
            precio_oferta: product.precio_oferta,
            tiene_oferta: product.tiene_oferta,
            imagen_principal_url: product.imagen_principal_url,
            genero: product.genero,
            fecha_creacion: product.fecha_creacion,
            cantidadVariantes: Array.isArray(product.variantes) ? product.variantes.length : 0
        }));
    }

    async obtenerProductoPorId(id: string): Promise<Product | null> {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select(`
                *,
                variantes(id)
            `)
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error obteniendo producto por ID:', error);
            return null;
        }
        return {
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            marca: data.marca,
            categoria: data.categoria,
            color_default: data.color_default,
            precio_base: data.precio_base,
            precio_oferta: data.precio_oferta,
            tiene_oferta: data.tiene_oferta,
            imagen_principal_url: data.imagen_principal_url,
            genero: data.genero,
            fecha_creacion: data.fecha_creacion,
            cantidadVariantes: Array.isArray(data.variantes) ? data.variantes.length : 0
        };
    }

    async obtenerImagenesDeProducto(productId: string, color: string): Promise<string[]> {
        const { data, error } = await this.supabaseClient.supabase
            .from('imagenes_variante')
            .select('url_imagen')
            .eq('producto_id', productId)
            .eq('color', color);
        if (error) {
            console.error('Error obteniendo imágenes del producto:', error);
            return [];
        }   
        return data.map((img: any) => img.url_imagen);
    }

    async obtenerPortadaProducto(productId: string): Promise<string | null> {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select('imagen_principal_url')
            .eq('id', productId)
            .single();

        if (error) {
            console.error('Error obteniendo la imagen de portada del producto:', error);
            return null;
        }
        return data.imagen_principal_url;
    }

}