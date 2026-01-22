import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/services/supabase.service';
import { Producto } from './core/models/producto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private supabaseService = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);
  
  productos: Producto[] = [];

  async ngOnInit() {
    console.log('Solicitando datos...');
    
    // Se piden los datos
    this.productos = await this.supabaseService.getProductos();
    
    console.log('Datos llegaron, forzando actualización de vista...');
    
    // Obligar a Angular a actualizar la vista
    this.cdr.detectChanges(); 
  }
}