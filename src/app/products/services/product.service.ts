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
                variantes(color)
            `);

        if (error) {
            console.error('Error obteniendo productos:', error);
            return [];
        }

        // Mapear los productos con la imagen principal y cantidad de colores distintos
        return (data || []).map(product => {
            // Contar colores únicos
            const coloresUnicos = Array.isArray(product.variantes) 
                ? new Set(product.variantes.map((v: any) => v.color).filter((c: string) => c)).size 
                : 0;

            return {
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
                cantidadVariantes: coloresUnicos
            };
        });
    }

    async obtenerProductoPorId(id: string): Promise<Product | null> {
        const { data, error } = await this.supabaseClient.supabase
            .from('productos')
            .select(`
                *,
                variantes(color)
            `)
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error obteniendo producto por ID:', error);
            return null;
        }

        // Contar colores únicos
        const coloresUnicos = Array.isArray(data.variantes) 
            ? new Set(data.variantes.map((v: any) => v.color).filter((c: string) => c)).size 
            : 0;

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
            cantidadVariantes: coloresUnicos
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

    async obtenerImagenPrincipalVariantes(productId: string): Promise<string[]> {

        // Obtener la imagen principal y el color por defecto del producto
        const { data: producto, error: errorProducto } = await this.supabaseClient.supabase
            .from('productos')
            .select('imagen_principal_url, color_default')
            .eq('id', productId)
            .single();

        if (errorProducto) {
            console.error('Error obteniendo imagen principal del producto:', errorProducto);
        }

        // Obtener las imágenes de las variantes
        const { data, error } = await this.supabaseClient.supabase
            .from('imagenes_variante')
            .select('url_imagen, color')
            .eq('producto_id', productId);

        if (error) {
            console.error('Error obteniendo la imagen principal de la variante:', error);
            return producto?.imagen_principal_url ? [producto.imagen_principal_url] : [];
        }

        // Agrupar por color y tomar la primera imagen de cada color
        const coloresVistos = new Set<string>();
        const primerasImagenes: string[] = [];

        // Agregar primero la imagen principal del producto
        if (producto?.imagen_principal_url) {
            primerasImagenes.push(producto.imagen_principal_url);
            // Marcar el color por defecto como visto para evitar duplicados
            if (producto.color_default) {
                coloresVistos.add(producto.color_default);
            }
        }

        // Agregar las primeras imágenes de cada color (excluyendo el color por defecto ya agregado)
        for (const imagen of data) {
            if (imagen.color && !coloresVistos.has(imagen.color)) {
                coloresVistos.add(imagen.color);
                primerasImagenes.push(imagen.url_imagen);
            }
        }

        return primerasImagenes;
    }

    async obtenerTallaProducto(productoId: string, color: string): Promise<{talla: string, stock: number}[]> {

        const { data, error } = await this.supabaseClient.supabase
            .from('variantes')
            .select('talla, stock')
            .eq('producto_id', productoId)
            .eq('color', color);

        if (error) {
            console.error('Error intentando obtener las tallas del producto: ', error);
            return [];
        }

        return data.map((item: any) => ({ talla: item.talla, stock: item.stock || 0 }));
    }

}