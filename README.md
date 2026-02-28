# Vestis

<p align="center">
  <img src="public/assets/images/logo.png" alt="Vestis Logo" width="120">
</p>

<p align="center">
  <strong>Tienda de moda deportiva - Diseño Frontend en Angular</strong>
</p>

<p align="center">
  <a href="https://ppereac.github.io/Vestis/" target="_blank"> Ver Demo en GitHub Pages</a>
</p>

---

## Aviso Importante

> **Este proyecto es únicamente un diseño frontend/demo visual.** No implementa funcionalidad real de backend. Las siguientes características son meramente decorativas:
> - **Carrito de compras** - No persiste datos ni procesa pedidos
> - **Login/Autenticación** - No valida credenciales ni gestiona sesiones  
> - **Pasarela de pago** - No realiza transacciones
> - **Búsqueda** - No filtra productos en tiempo real
> - **Perfil de usuario** - No guarda información personal
>
> El catálogo de productos se carga desde un archivo JSON estático.

---

## Descripción

**Vestis** es una maqueta/diseño frontend de una tienda de moda deportiva desarrollada con Angular y TailwindCSS. Muestra una interfaz moderna de comercio electrónico con catálogo de productos organizados por género, páginas de detalle simuladas y diseño responsive.

## Características Visuales

- **Página de inicio** con hero section y categorías destacadas
- **Catálogo por género**: Hombres, Mujeres y Niños (datos estáticos)
- **Página de producto** con diseño de selector de tallas y colores
- **Carrito de compras** (UI solamente, sin funcionalidad real)
- **Interfaz de login** (decorativa, sin autenticación real)
- **Tema claro/oscuro** con personalización de colores
- **Diseño 100% responsive**

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Angular](https://angular.io/) | 21.1.0 | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.x | Lenguaje de desarrollo |
| [TailwindCSS](https://tailwindcss.com/) | 4.1.12 | Framework de estilos |
| [DaisyUI](https://daisyui.com/) | 5.5.14 | Componentes UI basados en Tailwind |
| [RxJS](https://rxjs.dev/) | 7.8.x | Programación reactiva |

## Estructura del Proyecto

```
src/
├── app/
│   ├── app.ts                          # Componente raíz
│   ├── app.config.ts                   # Configuración de la aplicación
│   ├── app.routes.ts                   # Rutas principales
│   ├── app.html                        # Template raíz
│   ├── app.css                         # Estilos globales del componente raíz
│   ├── app.spec.ts                     # Tests del componente raíz
│   │
│   ├── core/                           # Núcleo de la aplicación
│   │   ├── models/
│   │   │   └── producto.model.ts       # Modelo de datos de producto
│   │   └── services/
│   │       └── supabase.service.ts     # Servicio de Supabase (preparado)
│   │
│   ├── products/                       # Módulo de productos
│   │   ├── components/
│   │   │   ├── product-card/
│   │   │   │   ├── product-card.ts     # Componente tarjeta de producto
│   │   │   │   └── product-card.html   # Template tarjeta de producto
│   │   │   └── product-list/           # (pendiente) Lista de productos
│   │   ├── interfaces/
│   │   │   └── product.interface.ts    # Interface de producto
│   │   └── services/
│   │       └── product.service.ts      # Servicio de catálogo (JSON estático)
│   │
│   ├── services/                       # Servicios globales
│   │   └── theme.service.ts            # Gestión de tema claro/oscuro
│   │
│   ├── features/                       # Características adicionales
│   │   └── catalog/
│   │       └── catalog.ts              # Catálogo usando Supabase
│   │
│   └── store-front/                    # Módulo de tienda (páginas públicas)
│       ├── components/
│       │   └── front-navbar/
│       │       ├── front-navbar.ts     # Barra de navegación
│       │       └── front-navbar.html   # Template navbar
│       │
│       ├── layouts/
│       │   └── store-front-layout/
│       │       ├── store-front-layout.ts     # Layout principal
│       │       └── store-front-layout.html   # Template layout
│       │
│       ├── pages/
│       │   ├── home-page/
│       │   │   ├── home-page.ts        # Página principal
│       │   │   └── home-page.html      # Template home
│       │   ├── gender-page/
│       │   │   ├── gender-page.ts      # Página de catálogo por género
│       │   │   └── gender-page.html    # Template catálogo género
│       │   ├── product-page/
│       │   │   ├── product-page.ts     # Página de detalle de producto
│       │   │   └── product-page.html   # Template detalle producto
│       │   ├── cart-page/
│       │   │   ├── cart-page.ts        # Página de carrito (UI)
│       │   │   └── cart-page.html      # Template carrito
│       │   ├── login-page/
│       │   │   ├── login-page.ts       # Página de login (UI)
│       │   │   ├── login-page.html     # Template login
│       │   │   └── login-page.css      # Estilos login
│       │   └── not-found-page/
│       │       ├── not-found-page.ts   # Página 404
│       │       └── not-found-page.html # Template 404
│       │
│       └── store-front-routes.ts       # Rutas de la tienda
│
├── public/                             # Assets estáticos
│   ├── assets/
│   │   ├── images/                     # Imágenes del proyecto
│   │   │   └── logo.png                # Logo de Vestis
│   │   └── fonts/                      # Fuentes personalizadas
│   │       └── Montserrat-Medium.ttf   # Fuente Montserrat
│   └── data/
│       └── catalogo.json               # Catálogo de productos mock
│
└── styles.css                          # Estilos globales y temas personalizados
```

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/PPereaC/Vestis.git
cd Vestis

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# Abrir en http://localhost:4200/
```

## Despliegue en GitHub Pages

```bash
ng deploy
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `ng serve` | Servidor de desarrollo |
| `ng build` | Build de producción |
| `ng deploy` | Desplegar a GitHub Pages |

---

<p align="center">
  Desarrollado como proyecto de diseño frontend con Angular
</p>
