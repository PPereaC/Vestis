import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServicioProductos } from '@products/services/product.service';
import { Product } from '@products/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './product-page.html',
})
export class ProductPage {

  private servicioProductos = inject(ServicioProductos);
  private route = inject(ActivatedRoute);

  productoId = signal<string>('');
  producto = signal<Product | null>(null);
  imagenesProducto = signal<string[]>([]);
  portadaProducto = signal<string | null>(null);
  imagenesVariantes = signal<string[]>([]);

  async ngOnInit() {

    this.productoId.set(this.route.snapshot.paramMap.get('id') || '');
    
    const data = await this.servicioProductos.obtenerProductoPorId(this.productoId());
    this.producto.set(data);

    const imagenes = await this.servicioProductos.obtenerImagenesDeProducto(this.productoId(), data?.color_default || '');
    this.imagenesProducto.set(imagenes);

    const portada = await this.servicioProductos.obtenerPortadaProducto(this.productoId());
    this.portadaProducto.set(portada);

    // Obtención de la imagen principal de cada variante existente del producto
    const imagenesVariantes = await this.servicioProductos.obtenerImagenPrincipalVariantes(this.productoId());
    console.log('Imágenes de variantes:', imagenesVariantes);
    this.imagenesVariantes.set(imagenesVariantes);

  }

  images = this.imagenesProducto;

  get imageClass() {
    return this.images.length === 4 ? 'flex-1 min-h-0' : 'h-[150px]';
  }

}
