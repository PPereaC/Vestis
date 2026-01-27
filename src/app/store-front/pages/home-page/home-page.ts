import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ServicioProductos } from '@products/services/product.service';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
  private servicioProductos = inject(ServicioProductos);

  productos = signal<Product[]>([]); 

  async ngOnInit() {
    const data = await this.servicioProductos.obtenerProductos();
    this.productos.set(data);
  }
}