import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [NgClass],
  templateUrl: './product-page.html',
})
export class ProductPage {
  images = [
    { color: 'bg-primary' },
    { color: 'bg-secondary' },
    { color: 'bg-accent' },
    { color: 'bg-neutral' },
  ];

  get imageClass() {
    return this.images.length === 4 ? 'flex-1 min-h-0' : 'h-[150px]';
  }

}
