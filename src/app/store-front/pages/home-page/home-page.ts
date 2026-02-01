import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-page.html',
})
export class HomePage {
  categorias = [
    {
      titulo: 'Hombres',
      descripcion: 'Estilo y comodidad',
      imagen: 'https://images.unsplash.com/flagged/photo-1574660879705-48123e1ac163?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/genero/hombre'
    },
    {
      titulo: 'Mujeres',
      descripcion: 'Elegancia urbana',
      imagen: 'https://plus.unsplash.com/premium_photo-1663045607940-26ded68c6417?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/genero/mujer'
    },
    {
      titulo: 'Niños',
      descripcion: 'Diversión y confort',
      imagen: 'https://plus.unsplash.com/premium_photo-1664303710047-e45854942cc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/genero/ninos'
    }
  ];

  colecciones = [
    {
      titulo: 'Nueva Colección',
      subtitulo: 'Primavera 2026',
      descripcion: 'Descubre las últimas tendencias',
      imagen: 'https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      titulo: 'Ofertas Especiales',
      subtitulo: 'Hasta 50% OFF',
      descripcion: 'En productos seleccionados',
      imagen: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=500&fit=crop'
    }
  ];
}