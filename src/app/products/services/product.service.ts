import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';

interface CatalogoData {
    productos: Array<{
        id: number | string;
        nombre: string;
        descripcion?: string;
        marca?: string;
        color_default?: string;
        categoria?: string;
        precio_base: number;
        precio_oferta?: number;
        tiene_oferta: boolean;
        imagen_principal_url?: string;
        genero?: string;
        fecha_creacion: string;
    }>;
    imagenes_variante: Array<{
        producto_id: number | string;
        color: string;
        url_imagen: string;
    }>;
    variantes: Array<{
        producto_id: number | string;
        color: string;
        talla: string;
        stock: number;
    }>;
}

@Injectable({
    providedIn: 'root'
})
export class ServicioProductos {
    private http = inject(HttpClient);
    private readonly catalogoUrl = '/data/catalogo.json';
    private catalogoCache: CatalogoData | null = null;

    private async cargarCatalogo(): Promise<CatalogoData> {
        if (this.catalogoCache) {
            return this.catalogoCache;
        }

        try {
            this.catalogoCache = await firstValueFrom(
                this.http.get<CatalogoData>(this.catalogoUrl)
            );
        } catch (error) {
            console.error('Error cargando el catalogo local:', error);
            this.catalogoCache = { productos: [], imagenes_variante: [], variantes: [] };
        }

        return this.catalogoCache;
    }

    private contarColoresUnicos(variantes: CatalogoData['variantes'], productId: string): number {
        const colores = variantes
            .filter((v) => String(v.producto_id) === productId && v.color)
            .map((v) => v.color);

        return new Set(colores).size;
    }

    private mapProduct(product: CatalogoData['productos'][number], variantes: CatalogoData['variantes']): Product {
        return {
            id: Number(product.id),
            nombre: product.nombre,
            descripcion: product.descripcion,
            marca: product.marca,
            color_default: product.color_default,
            categoria: product.categoria,
            precio_base: product.precio_base,
            precio_oferta: product.precio_oferta,
            tiene_oferta: product.tiene_oferta,
            imagen_principal_url: product.imagen_principal_url,
            genero: product.genero as Product['genero'],
            fecha_creacion: product.fecha_creacion,
            cantidadVariantes: this.contarColoresUnicos(variantes, String(product.id))
        };
    }

    private normalizarTexto(texto: string): string {
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    async obtenerProductos(): Promise<Product[]> {
        const catalogo = await this.cargarCatalogo();
        return catalogo.productos.map((product) => this.mapProduct(product, catalogo.variantes));
    }

    async obtenerProductosPorGenero(genero: string): Promise<Product[]> {
        const catalogo = await this.cargarCatalogo();
        const generoNormalizado = this.normalizarTexto(genero);

        return catalogo.productos
            .filter((p) => this.normalizarTexto(p.genero || '') === generoNormalizado)
            .map((product) => this.mapProduct(product, catalogo.variantes));
    }

    async obtenerProductoPorId(id: string): Promise<Product | null> {
        const catalogo = await this.cargarCatalogo();
        const product = catalogo.productos.find((p) => String(p.id) === String(id));

        if (!product) {
            return null;
        }

        return this.mapProduct(product, catalogo.variantes);
    }

    async obtenerImagenesDeProducto(productId: string, color: string): Promise<string[]> {
        const catalogo = await this.cargarCatalogo();
        const producto = catalogo.productos.find((p) => String(p.id) === String(productId));

        const imagenesVariante = catalogo.imagenes_variante
            .filter((img) => String(img.producto_id) === String(productId) && img.color === color)
            .map((img) => img.url_imagen);

        if (producto?.imagen_principal_url) {
            const imagenesSinDuplicados = imagenesVariante.filter((url) => url !== producto.imagen_principal_url);
            return [producto.imagen_principal_url, ...imagenesSinDuplicados];
        }

        return imagenesVariante;
    }

    async obtenerPortadaProducto(productId: string): Promise<string | null> {
        const catalogo = await this.cargarCatalogo();
        const producto = catalogo.productos.find((p) => String(p.id) === String(productId));
        return producto?.imagen_principal_url || null;
    }

    async obtenerImagenPrincipalVariantes(productId: string): Promise<string[]> {
        const catalogo = await this.cargarCatalogo();
        const producto = catalogo.productos.find((p) => String(p.id) === String(productId));
        const imagenes = catalogo.imagenes_variante.filter((img) => String(img.producto_id) === String(productId));

        const coloresVistos = new Set<string>();
        const primerasImagenes: string[] = [];

        if (producto?.imagen_principal_url) {
            primerasImagenes.push(producto.imagen_principal_url);
            if (producto.color_default) {
                coloresVistos.add(producto.color_default);
            }
        }

        for (const imagen of imagenes) {
            if (imagen.color && !coloresVistos.has(imagen.color)) {
                coloresVistos.add(imagen.color);
                primerasImagenes.push(imagen.url_imagen);
            }
        }

        return primerasImagenes;
    }

    async obtenerTallaProducto(productoId: string, color: string): Promise<{ talla: string, stock: number }[]> {
        const catalogo = await this.cargarCatalogo();
        return catalogo.variantes
            .filter((item) => String(item.producto_id) === String(productoId) && item.color === color)
            .map((item) => ({ talla: item.talla, stock: item.stock || 0 }));
    }
}
