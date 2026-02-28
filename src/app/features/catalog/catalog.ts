import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-8">
      <h2 class="text-3xl font-bold mb-6">Catálogo AdiDAW</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div *ngFor="let item of productos" class="border p-4 rounded shadow">
           <img [src]="item.imagen_url" class="h-32 w-full object-cover mb-2">
           <h3 class="font-bold">{{ item.nombre }}</h3>
           <p class="text-blue-600 font-bold">{{ item.precio }}€</p>
        </div>
      </div>
    </div>
  `
})
export class CatalogComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);
  productos: Producto[] = [];

  async ngOnInit() {
    this.productos = await this.supabaseService.getProductos();
    this.cdr.detectChanges();
  }
}