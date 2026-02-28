import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
}
