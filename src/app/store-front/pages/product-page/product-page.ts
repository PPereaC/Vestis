import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioProductos } from '@products/services/product.service';
import { Product } from '@products/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe],
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
  tallas = signal<{talla: string, stock: number}[]>([]);
  tallaSeleccionada = signal<string>('');
  stockTallaSeleccionada = signal<number>(0);

  async ngOnInit() {

    // Scroll arriba del todo al cargar la página
    window.scrollTo(0, 0);

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

    // Coger color de la url
    const color = this.route.snapshot.queryParamMap.get('color');
    
    // Obtención de las tallas del producto
    const tallasProducto = await this.servicioProductos.obtenerTallaProducto(this.productoId(), color!);
    
    // Comprobar si la talla es por número, si es por número ordenar de menor a mayor
    if (tallasProducto.length > 0 && !isNaN(Number(tallasProducto[0].talla))) {
      tallasProducto.sort((a, b) => Number(a.talla) - Number(b.talla));
    }

    this.tallas.set(tallasProducto);

  }

  onTallaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const talla = select.value;
    this.tallaSeleccionada.set(talla);
    
    const tallaEncontrada = this.tallas().find(t => t.talla === talla);
    this.stockTallaSeleccionada.set(tallaEncontrada?.stock || 0);
  }

  mostrarAlertaStock(): boolean {
    return this.tallaSeleccionada() !== '' && this.stockTallaSeleccionada() > 0 && this.stockTallaSeleccionada() < 5;
  }

  obtenerMensajeAlertaStock(): string {
    const stock = this.stockTallaSeleccionada();
    if (stock === 1) {
      return '¡Solo queda 1 unidad disponible!';
    } else {
      return `¡Solo quedan ${stock} unidades disponibles!`;
    }
  }

  images = this.imagenesProducto;

  get imageClass() {
    return this.images.length === 4 ? 'flex-1 min-h-0' : 'h-[150px]';
  }

}
