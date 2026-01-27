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
                producto_imagenes!inner(
                    url
                ),
                producto_variantes(id)
            `)
            .eq('producto_imagenes.es_portada', true);

        if (error) {
            console.error('Error obteniendo productos:', error);
            return [];
        }

        // Mapear los productos con la imagen de portada y cantidad de variantes
        return (data || []).map(product => ({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            marca: product.marca,
            categoria: product.categoria,
            precio_base: product.precio_base,
            created_at: product.created_at,
            imagen_url: product.producto_imagenes?.[0]?.url,
            cantidadVariantes: Array.isArray(product.producto_variantes) ? product.producto_variantes.length : 0
        }));
    }

    async obtenerProductoPorId(id: string): Promise<Product | null> {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select(`
                *,
                producto_imagenes(
                    url,
                    es_portada
                ),
                producto_variantes(id)
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
            precio_base: data.precio_base,
            created_at: data.created_at,
            imagen_url: data.producto_imagenes.find((img: any) => img.es_portada)?.url || '',
            cantidadVariantes: Array.isArray(data.producto_variantes) ? data.producto_variantes.length : 0
        };
    }

    async obtenerImagemesDeProducto(productId: string): Promise<string[]> {
        const { data, error } = await this.supabaseClient.supabase
            .from('producto_imagenes')
            .select('url')
            .eq('producto_id', productId);
        if (error) {
            console.error('Error obteniendo imágenes del producto:', error);
            return [];
        }   
        return data.map((img: any) => img.url);
    }

    async obtenerPortadaProducto(productId: string): Promise<string | null> {
        const { data, error } = await this.supabaseClient.supabase
            .from('producto_imagenes')
            .select('url')
            .eq('producto_id', productId)
            .eq('es_portada', 'TRUE')
            .single();

            console.log(data);

        if (error) {
            console.error('Error obteniendo la imagen de portada del producto:', error);
            return null;
        }
        return data.url;
    }

}