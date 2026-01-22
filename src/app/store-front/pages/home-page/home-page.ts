import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductService } from '@products/services/product.service';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCard],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      @for (item of products(); track item.id) {
        <product-card [product]="item" />
      }
    </div>
  `
})
export class HomePage implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]); 

  async ngOnInit() {
    const data = await this.productService.getProducts();
    this.products.set(data);
  }
}