import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Patitas Social Club — Para compartir con tu mejor amigo',
  description:
    'Restaurante pet friendly y centro de experiencias gourmet para mascotas y sus familias. Centro Comercial Bulevar Niza, Bogotá.',
  keywords: 'restaurante, mascotas, pet friendly, bowls, helados, pupcakes, Bogotá',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
