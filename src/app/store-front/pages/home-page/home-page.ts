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
      titulo: 'Hombre',
      imagen: 'https://images.unsplash.com/flagged/photo-1574660879705-48123e1ac163?q=80&w=764&auto=format&fit=crop',
      link: '/genero/hombre'
    },
    {
      titulo: 'Mujer',
      imagen: 'https://plus.unsplash.com/premium_photo-1663045607940-26ded68c6417?q=80&w=687&auto=format&fit=crop',
      link: '/genero/mujer'
    },
    {
      titulo: 'Niños',
      imagen: 'https://plus.unsplash.com/premium_photo-1664303710047-e45854942cc7?q=80&w=687&auto=format&fit=crop',
      link: '/genero/ninos'
    }
  ];

  destacados = [
    {
      titulo: 'Primavera 2026',
      badge: 'Nueva temporada',
      imagen: 'https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?q=80&w=1470&auto=format&fit=crop',
      link: '/genero/mujer',
      size: 'large'
    },
    {
      titulo: 'Hasta -50%',
      badge: 'Ofertas flash',
      imagen: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=500&fit=crop',
      link: '/genero/hombre',
      size: 'small'
    },
    {
      titulo: 'Streetwear',
      badge: 'Tendencia',
      imagen: 'https://plus.unsplash.com/premium_photo-1685366445883-709973744248?q=80&w=687&auto=format&fit=crop',
      link: '/genero/hombre',
      size: 'small'
    }
  ];

  logosMarcas = [
    { name: 'Nike', logoUrl: 'https://cdn.simpleicons.org/nike/FFFFFF' },
    { name: 'Adidas', logoUrl: 'https://cdn.simpleicons.org/adidas/FFFFFF' },
    { name: 'Puma', logoUrl: 'https://cdn.simpleicons.org/puma/FFFFFF' },
    { name: 'New Balance', logoUrl: 'https://cdn.simpleicons.org/newbalance/FFFFFF' },
    { name: 'Reebok', logoUrl: 'https://cdn.simpleicons.org/reebok/FFFFFF' },
    { name: 'Asics', logoUrl: 'https://i.imgur.com/3ZJsneT.png' },
    { name: 'Under Armour', logoUrl: 'https://cdn.simpleicons.org/underarmour/FFFFFF' },
    { name: 'Converse', logoUrl: 'https://i.imgur.com/6L64XTK.png' },
    { name: 'Vans', logoUrl: 'https://i.imgur.com/7i0fsl0.png' },
    { name: 'Umbro', logoUrl: 'https://i.imgur.com/SkQGEIA.png' },
    { name: 'Kappa', logoUrl: 'https://i.imgur.com/I6tNG8i.png' },
    { name: 'North Face', logoUrl: 'https://cdn.simpleicons.org/thenorthface/FFFFFF' },
    { name: 'Fila', logoUrl: 'https://cdn.simpleicons.org/fila/FFFFFF' }
  ];

  currentSlide = 0;

}