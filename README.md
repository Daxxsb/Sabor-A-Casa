# Patitas Social Club

Sitio web oficial de **Patitas Social Club**, restaurante pet friendly y centro de experiencias gourmet para mascotas y sus familias. Ubicado en el Centro Comercial Bulevar Niza, Bogotá, Colombia.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.9 | Framework (App Router) |
| [React](https://react.dev) | 19.2.4 | UI |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | — | Tipografía display |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | — | Tipografía UI |

---

## Requisitos previos

- Node.js **18.18+**
- npm **9+**

---

## Instalación y desarrollo

```bash
# 1. Clonar el repositorio
git clone https://github.com/Daxxsb/Sabor-A-Casa.git
cd Sabor-A-Casa

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.

---

## Estructura del proyecto

```
/
├── app/
│   ├── globals.css        # Variables de tema, animaciones, utilidades CSS
│   ├── layout.tsx         # Layout raíz (fuentes, metadata)
│   └── page.tsx           # Página principal (todos los componentes)
│
└── public/
    └── images/
        ├── hero/          # hero.mp4 — video de fondo del Hero
        ├── caracteristicas/
        │   ├── petfriendly.jpg
        │   ├── postres.jpg
        │   └── amorincondicional.jpg
        ├── nosotros/      # bruno.jpeg
        └── galeria/       # Espacio.jpg · Chill.jpg · Coffee.jpg · Michis.jpg · Relax.jpg
```

---

## Secciones del sitio

| Sección | Descripción |
|---|---|
| **Hero** | Video de fondo a pantalla completa con overlay y CTAs |
| **Características** | Tres tarjetas cinematográficas con imagen 1:1 y overlay animado |
| **Nuestra Historia** | Origen de la marca con fotografía de Bruno |
| **Misión / Valores** | Paneles de misión + visión y grid de valores |
| **Nuestro Menú** | Seis categorías de productos con hover interactivo |
| **Galería** | Grid de 5 imágenes con lightbox navegable (teclado y clic) |
| **Contacto** | Formulario de contacto integrado con Formspree |

---

## Configuración del formulario de contacto

El formulario usa [Formspree](https://formspree.io) para enviar los mensajes al correo del negocio.

1. Crear una cuenta en [formspree.io](https://formspree.io)
2. Crear un nuevo formulario y copiar el ID (ej. `xabcd1234`)
3. Reemplazar el endpoint en `app/page.tsx` línea ~513:

```ts
// Antes
const res = await fetch('https://formspree.io/f/XXXXXXXX', ...)

// Después
const res = await fetch('https://formspree.io/f/xabcd1234', ...)
```

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción
npm run start    # Servidor de producción (requiere build previo)
npm run lint     # Linter ESLint
```

---

## Despliegue

El proyecto está optimizado para desplegarse en [Vercel](https://vercel.com):

```bash
# Con Vercel CLI
npx vercel

# O conectar el repositorio directamente desde vercel.com
```

También es compatible con cualquier plataforma que soporte Node.js 18+.

---

## Contacto del negocio

**Patitas Social Club**
Ak. 58 #127-59, Centro Comercial Bulevar Niza — Bogotá, Colombia
[patitassocialclub@gmail.com](mailto:patitassocialclub@gmail.com)
