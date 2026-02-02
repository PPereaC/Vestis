import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { Product } from '@products/interfaces/product.interface';
import { ServicioProductos } from '@products/services/product.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  private servicioProductos = inject(ServicioProductos);
  private route = inject(ActivatedRoute);

  // Se convierten los parametros de la URL en señales
  private params = toSignal(this.route.params);

  productos = signal<Product[]>([]); 
  genero = signal<string>('');

  constructor() {
    // Este Effect se ejecuta cada vez que params cambia
    effect(async () => {
      const routeParams = this.params();

      if (routeParams && routeParams['genero']) {
        // Scroll arriba del todo al cargar la página
        window.scrollTo(0, 0);

        // Obtención y formateo del género
        const generoDeUrl = routeParams['genero'];
        const generoFormateado = generoDeUrl.charAt(0).toUpperCase() + generoDeUrl.slice(1).toLowerCase();
        this.genero.set(generoFormateado);

        // Cargar productos según el género
        const productos = await this.servicioProductos.obtenerProductosPorGenero(generoFormateado);
        this.productos.set(productos);
      }

    });
  }

}
