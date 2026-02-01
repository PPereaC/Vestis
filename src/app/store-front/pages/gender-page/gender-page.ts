import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { Product } from '@products/interfaces/product.interface';
import { ServicioProductos } from '@products/services/product.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage implements OnInit {

  private servicioProductos = inject(ServicioProductos);

  productos = signal<Product[]>([]); 

  async ngOnInit() {
    const data = await this.servicioProductos.obtenerProductos();
    this.productos.set(data);
  }

}
