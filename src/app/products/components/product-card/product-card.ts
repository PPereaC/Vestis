import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
}
