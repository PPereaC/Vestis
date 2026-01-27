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
                )
            `)
            .eq('producto_imagenes.es_portada', true);

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        // Mapear los productos con la imagen de portada
        return (data || []).map(product => ({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            marca: product.marca,
            categoria: product.categoria,
            precio_base: product.precio_base,
            created_at: product.created_at,
            imagen_url: product.producto_imagenes?.[0]?.url
        }));
    }
}