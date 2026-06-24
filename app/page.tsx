'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

/* ── Scroll reveal hook ───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── Nav ──────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#nosotros', label: 'Quiénes somos' },
    { href: '#menu',     label: 'Nuestro menú'  },
    { href: '#galeria',  label: 'Galería'        },
    { href: '#contacto', label: 'Contacto'       },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-espresso/96 backdrop-blur-md shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between" style={{ height: '72px' }}>
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-display font-semibold text-cream tracking-[0.18em] text-base">PATITAS</span>
          <span className="text-copper tracking-[0.35em] text-[9px] uppercase mt-0.5">Social Club</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sand/80 text-sm tracking-wide hover:text-copper transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/16105688137"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-copper text-copper text-sm tracking-wide px-5 py-2 hover:bg-copper hover:text-espresso transition-all duration-300"
          >
            Reservar
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-cream p-1" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-espresso border-t border-copper/20 px-8 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sand text-sm tracking-widest uppercase hover:text-copper transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/16105688137"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-copper text-copper text-sm tracking-wide px-5 py-2.5 text-center hover:bg-copper hover:text-espresso transition-all duration-300"
          >
            Reservar visita
          </a>
        </div>
      )}
    </header>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/images/hero/hero.mp4" type="video/mp4" />
      </video>
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/55 to-espresso/80" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-copper text-xs tracking-[0.45em] uppercase mb-8">
          Restaurante · Postres · Amor
        </p>
        <h1 className="font-display text-cream font-light leading-none mb-4"
          style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', letterSpacing: '0.04em' }}>
          PATITAS
        </h1>
        <p className="font-display text-copper tracking-[0.5em] text-lg md:text-2xl uppercase mb-8">
          Social Club
        </p>
        <p className="font-display italic text-sand/90 text-xl md:text-2xl font-light mb-14">
          Para compartir con tu mejor amigo
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-copper text-espresso text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold transition-colors duration-300"
          >
            Ver menú
          </a>
          <a
            href="#contacto"
            className="border border-cream/60 text-cream text-sm tracking-widest uppercase px-10 py-4 hover:border-copper hover:text-copper transition-all duration-300"
          >
            Reservar visita
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

/* ── Divider elegante ─────────────────────────────────────────── */
function ElegantDivider({ text }: { text: string }) {
  return (
    <div className="bg-cream py-7 px-8">
      <div className="max-w-3xl mx-auto section-rule text-caramel">
        <span className="font-display italic text-caramel text-base whitespace-nowrap">{text}</span>
      </div>
    </div>
  )
}

/* ── Features ─────────────────────────────────────────────────── */
function Features() {
  const items = [
    {
      num: '01',
      img: '/images/caracteristicas/petfriendly.jpg',
      title: 'Pet Friendly',
      desc: 'Espacios diseñados para que tu mascota se sienta bienvenida, cómoda y feliz en cada visita.',
    },
    {
      num: '02',
      img: '/images/caracteristicas/postres.jpg',
      title: 'Postres Gourmet',
      desc: 'Bowls, helados, pupcakes y caldos preparados con ingredientes frescos y aptos para perros.',
    },
    {
      num: '03',
      img: '/images/caracteristicas/amorincondicional.jpg',
      title: 'Amor Incondicional',
      desc: 'Creemos que los mejores momentos se disfrutan en compañía de quienes más amamos.',
    },
  ]

  return (
    <section className="bg-cream py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <div>
            <p className="text-copper text-xs tracking-[0.4em] uppercase mb-3">Lo que nos hace únicos</p>
            <h2 className="font-display text-espresso font-light leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Una experiencia<br />diferente
            </h2>
          </div>
          <p className="font-display italic text-muted text-base md:text-lg mb-1 max-w-xs md:text-right">
            Cada detalle pensado para ti y para quien más amas
          </p>
        </div>

        {/* Cards cinematográficas — imagen 1:1 con overlay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand">
          {items.map(({ num, img, title, desc }, i) => (
            <div
              key={title}
              data-reveal
              data-delay={String(i + 1)}
              className="relative aspect-square overflow-hidden group cursor-default"
            >
              {/* Imagen con zoom en hover */}
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradiente permanente de base */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/25 to-transparent" />

              {/* Número tipográfico — elemento gráfico */}
              <span
                className="absolute top-5 left-6 font-display text-cream/15 font-light select-none leading-none"
                style={{ fontSize: 'clamp(4rem, 9vw, 6.5rem)' }}
              >
                {num}
              </span>

              {/* Contenido inferior */}
              <div className="absolute inset-x-0 bottom-0 px-7 pb-8">
                {/* Línea de acento */}
                <div className="w-8 h-px bg-copper mb-5 transition-all duration-500 group-hover:w-14" />
                <h3 className="font-display text-cream font-light text-2xl md:text-3xl mb-3 leading-tight">
                  {title}
                </h3>
                {/* Descripción emerge en hover */}
                <p className="text-sand/75 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-28 transition-all duration-500 ease-out">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Historia ─────────────────────────────────────────────────── */
function Historia() {
  return (
    <section id="nosotros" className="bg-espresso py-28 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda: texto */}
          <div data-reveal="left">
            <p className="text-copper text-xs tracking-[0.4em] uppercase mb-4">Nuestra historia</p>
            <h2 className="font-display text-cream font-light leading-tight mb-12"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Todo empezó<br />con Bruno
            </h2>
            <div className="space-y-6 text-sand/70 text-[15px] leading-relaxed">
              <p>
                Somos una pareja de emprendedores bogotanos y nuestra historia comenzó con algo muy sencillo:
                el amor que sentimos por nuestro compañero de cuatro patas, Bruno. Como muchas familias que
                consideran a sus mascotas parte fundamental de su hogar, disfrutábamos compartir nuestro
                tiempo libre con él, salir a pasear, conocer nuevos lugares y vivir experiencias juntos.
              </p>
              <p>
                Sin embargo, en varias ocasiones nos encontramos con una situación que se repetía
                constantemente. Cuando visitábamos restaurantes, cafeterías o espacios de entretenimiento,
                no siempre era posible ingresar con Bruno. Muchas veces debíamos dejarlo en casa o
                permanecer fuera de los establecimientos, limitando la posibilidad de compartir
                momentos especiales en familia.
              </p>
              <p>
                Estas experiencias nos llevaron a reflexionar sobre la importancia que tienen las mascotas
                en la vida de las personas. Entendimos que nuestros amigos peludos no son solo animales de
                compañía — son miembros de la familia que también merecen espacios donde puedan disfrutar,
                socializar y sentirse bienvenidos.
              </p>
              <p>
                Fue entonces cuando nació la idea de crear un restaurante diferente: un lugar pensado
                especialmente para las mascotas, donde ellas fueran las protagonistas y sus familias
                pudieran acompañarlas y compartir momentos inolvidables. Soñamos con un espacio seguro,
                cómodo y divertido, con un menú diseñado para ellos y un ambiente acogedor para todos.
              </p>
              <p className="text-sand/90 font-medium">
                Así nació Patitas Social Club, inspirado por Bruno y por todas aquellas familias que desean
                compartir más tiempo con sus mascotas. Porque creemos que los mejores momentos de la vida
                se disfrutan en compañía de quienes más amamos — incluyendo a nuestros amigos de cuatro patas.
              </p>
            </div>
          </div>

          {/* Columna derecha: imagen con hover zoom */}
          <div data-reveal="right" className="overflow-hidden group cursor-pointer">
            <Image
              src="/images/nosotros/bruno.jpeg"
              alt="Bruno"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Misión / Valores ─────────────────────────────────────────── */
function MisionValores() {
  const valores = [
    { n: 'Amor por los animales', d: 'El valor que guía cada decisión.' },
    { n: 'Bienestar animal',      d: 'Entorno seguro, cómodo y saludable.' },
    { n: 'Respeto',               d: 'Por clientes, mascotas y entorno.' },
    { n: 'Calidad',               d: 'Ingredientes frescos, seleccionados.' },
    { n: 'Innovación',            d: 'Mejoramos la experiencia siempre.' },
    { n: 'Compromiso',            d: 'Excelencia en cada visita.' },
    { n: 'Resp. social',          d: 'Tenencia responsable y comunidad.' },
    { n: 'Confianza',             d: 'Transparencia en todo lo que hacemos.' },
  ]

  return (
    <section className="bg-cream py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-1 mb-1">
          <div data-reveal className="bg-sand p-12 md:p-16">
            <p className="text-copper text-xs tracking-[0.4em] uppercase mb-5">Misión</p>
            <p className="font-display text-espresso text-xl md:text-2xl font-light leading-relaxed mb-6">
              Brindar una experiencia gastronómica única, segura y memorable para las mascotas
              y sus familias, ofreciendo bowls, helados, snacks y opciones diseñadas para el
              bienestar de nuestros amigos peludos, con ingredientes frescos y de alta calidad.
            </p>
            <p className="text-caramel text-sm leading-relaxed mb-4">
              Nuestro restaurante busca crear un espacio innovador, cómodo y acogedor donde las
              mascotas sean las protagonistas y puedan socializar, jugar y disfrutar de un ambiente
              especialmente diseñado para ellas, mientras sus familias comparten momentos agradables.
            </p>
            <p className="text-caramel text-sm leading-relaxed">
              Trabajamos con pasión, responsabilidad y amor por los animales, promoviendo la
              convivencia entre mascotas y familias, y buscando convertir cada visita en una
              experiencia inolvidable.
            </p>
          </div>
          <div data-reveal data-delay="2" className="bg-espresso p-12 md:p-16">
            <p className="text-copper text-xs tracking-[0.4em] uppercase mb-5">Visión</p>
            <p className="font-display text-cream text-xl md:text-2xl font-light leading-relaxed mb-6">
              Ser el restaurante pet friendly líder y de mayor preferencia para las mascotas y
              sus familias, reconocidos por ofrecer experiencias únicas de convivencia y
              alimentación especializada.
            </p>
            <p className="text-sand/60 text-sm leading-relaxed mb-4">
              Aspiramos a consolidarnos como una marca innovadora y referente en el sector,
              destacándonos por la calidad de nuestros productos, la excelencia en el servicio
              y nuestro compromiso con el bienestar animal.
            </p>
            <p className="text-sand/60 text-sm leading-relaxed">
              Nos proyectamos como una empresa sostenible, competitiva y socialmente responsable,
              capaz de generar valor para nuestros clientes y comunidad, promoviendo una cultura
              de respeto, amor y cuidado hacia los animales.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div data-reveal className="mt-24">
          <p className="text-copper text-xs tracking-[0.4em] uppercase mb-3 text-center">Nuestros valores</p>
          <h3 className="font-display text-espresso font-light text-center mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Lo que nos define
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sand">
            {valores.map(({ n, d }, i) => (
              <div
                key={n}
                data-reveal
                data-delay={String((i % 4) + 1)}
                className="bg-cream p-7"
              >
                <div className="w-6 h-px bg-copper mb-5" />
                <p className="font-display text-espresso text-lg font-medium mb-2">{n}</p>
                <p className="text-muted text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Ficha académica — requisito rúbrica UTH Florida University */}
        <div data-reveal className="mt-20 border-t border-sand pt-12">
          <p className="text-copper text-[10px] tracking-[0.4em] uppercase mb-8">Información académica</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-sand">
            <div className="bg-cream p-7">
              <div className="w-5 h-px bg-copper mb-4" />
              <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Presentado por</p>
              <p className="font-display text-espresso text-lg font-medium leading-snug">
                Lizeth Daniela<br />Poveda Alonso
              </p>
            </div>
            <div className="bg-cream p-7">
              <div className="w-5 h-px bg-copper mb-4" />
              <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Institución</p>
              <p className="font-display text-espresso text-lg font-medium leading-snug">
                UTH Florida<br />University
              </p>
            </div>
            <div className="bg-cream p-7">
              <div className="w-5 h-px bg-copper mb-4" />
              <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Curso y entrega</p>
              <p className="font-display text-espresso text-lg font-medium leading-snug">
                Informática<br />Aplicada
              </p>
            </div>
            <div className="bg-cream p-7">
              <div className="w-5 h-px bg-copper mb-4" />
              <p className="text-muted text-[10px] tracking-[0.3em] uppercase mb-3">Tecnología usada</p>
              <p className="font-display text-espresso text-base font-medium leading-relaxed">
                Next.js 16 + TypeScript<br />
                <span className="text-muted font-normal text-sm">Tailwind CSS 4 · Vercel Deploy</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Menú preview ─────────────────────────────────────────────── */
function MenuPreview() {
  const categorias = [
    { name: 'Bowls Gourmet',          desc: '"Patitas Felices" — pollo, arroz integral y vegetales · "Colita Contenta" — res, zanahoria y calabaza · "Fiesta Perruna" — pollo, carne, mango y arándanos · "Bruno Especial" — salmón, camote y vegetales, rico en Omega 3.' },
    { name: 'Helados Artesanales',    desc: '"Banana Woof" — banano y yogur · "Berry Love" — fresa, arándanos y yogur · "Tropical Paw" — mango, coco y yogur · "Peanut Tail" — mantequilla de maní y banano. Favorito de la casa.' },
    { name: 'Pupcakes',               desc: '"Cumpleaños Feliz" — zanahoria con frosting de yogur · "Amor de Patitas" — manzana y avena · "Mini Bruno" — banano con mantequilla de maní. Para celebrar momentos especiales.' },
    { name: 'Caldos y Sopitas',       desc: '"Abrazo de Mamá" — caldo de pollo con zanahoria y perejil · "Colitas Felices" — caldo de res con verduras naturales · "Vida de Patitas" — caldo de hueso rico en colágeno y minerales.' },
    { name: 'Galletitas Artesanales', desc: '"Huellitas Crujientes" — avena y zanahoria · "Premios de la Casa" — pollo deshidratado · "Bocaditos de Amor" — manzana y canela. 100% naturales y artesanales.' },
    { name: 'Menú de Celebración',    desc: 'Torta "Patitas de Fiesta" — pastel personalizado para cumpleaños · Box Cumpleañero incluye pupcake, helado, galletitas, pañoleta y foto Polaroid. Sundae "Happy Tail" · Parfait "Huellitas Dulces" · Waffles "Patitas".' },
  ]

  return (
    <section id="menu" className="bg-espresso py-28 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div data-reveal className="text-center mb-20">
          <p className="text-copper text-xs tracking-[0.45em] uppercase mb-4">Para nuestros perritos</p>
          <h2 className="font-display text-cream font-light"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            Nuestro Menú
          </h2>
          <p className="font-display italic text-sand/60 text-xl mt-3">
            Para compartir con tu mejor amigo
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-copper/10">
          {categorias.map(({ name, desc }, i) => (
            <div
              key={name}
              data-reveal
              data-delay={String((i % 3) + 1)}
              className="bg-espresso p-8 md:p-10 group hover:bg-caramel/30 transition-colors duration-500"
            >
              <div className="w-8 h-px bg-copper mb-8 group-hover:w-16 transition-all duration-500" />
              <h3 className="font-display text-cream text-2xl font-light mb-3">{name}</h3>
              <p className="text-sand/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Para humanos */}
        <div data-reveal className="mt-px bg-sand/5 border border-copper/15 p-10 md:p-14 text-center">
          <p className="text-copper text-xs tracking-[0.4em] uppercase mb-3">Para los humanos</p>
          <p className="font-display text-cream font-light text-2xl md:text-3xl mb-4">
            Porque ellos también merecen consentirse
          </p>
          <p className="text-sand/50 text-sm leading-relaxed max-w-2xl mx-auto">
            Limonada "Cherry Bliss" (especialidad de la casa) · Limonada Clásica · Jugos Naturales de Mango, Fresa y Maracuyá · Gaseosas · Brownie "Dulce Compañía" · Copa "Momentos Felices" · Pastel de Pollo Casero · Bocaditos "Social Club"
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── Datos de galería (fuera del componente para evitar re-creación) */
const GALLERY_ITEMS = [
  { src: '/images/galeria/Espacio.jpg', alt: 'El espacio de Patitas Social Club', caption: 'Tu nuevo rincón favorito',    span: 'col-span-2 row-span-2' },
  { src: '/images/galeria/Chill.jpg',   alt: 'Mascotas en descanso',              caption: 'El descanso que se merecen', span: '' },
  { src: '/images/galeria/Coffee.jpg',  alt: 'Menú de Patitas Social Club',       caption: 'Antojos que valen la visita', span: '' },
  { src: '/images/galeria/Michis.jpg',  alt: 'Visita a Patitas Social Club',      caption: 'Así se ve la felicidad',     span: '' },
  { src: '/images/galeria/Relax.jpg',   alt: 'Clientes y mascotas en Patitas',    caption: 'Juntos, siempre mejor',      span: '' },
]

/* ── Galería ──────────────────────────────────────────────────── */
function Galeria() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const n = GALLERY_ITEMS.length

  useEffect(() => {
    if (lightbox === null) { document.body.style.overflow = ''; return }
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowRight')  setLightbox(i => i !== null ? (i + 1) % n : null)
      if (e.key === 'ArrowLeft')   setLightbox(i => i !== null ? (i - 1 + n) % n : null)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, n])

  return (
    <section id="galeria" className="bg-cream py-28 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <div data-reveal className="flex items-end justify-between mb-12">
          <div>
            <p className="text-copper text-xs tracking-[0.4em] uppercase mb-3">Galería</p>
            <h2 className="font-display text-espresso font-light"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Momentos que se quedan
            </h2>
          </div>
          <p className="hidden md:block font-display italic text-muted text-lg mb-1">
            @patitassocialclub
          </p>
        </div>

        {/* Grid */}
        <div data-reveal="fade" className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-2">
          {GALLERY_ITEMS.map(({ src, alt, caption, span }, i) => (
            <div
              key={alt}
              className={`relative overflow-hidden group cursor-pointer ${span}`}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay con caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="px-5 pb-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="w-6 h-px bg-copper mb-2 group-hover:w-10 transition-all duration-500" />
                  <span className="font-display italic text-cream text-sm md:text-base leading-tight">
                    {caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="md:hidden text-center font-display italic text-muted mt-6">
          @patitassocialclub
        </p>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-espresso/97 flex items-center justify-center"
          style={{ animation: 'fadeInOverlay 0.3s ease' }}
          onClick={() => setLightbox(null)}
        >
          {/* Contador + caption */}
          <div className="absolute top-7 left-8 pointer-events-none">
            <p className="text-copper text-[10px] tracking-[0.4em] uppercase mb-1">
              {lightbox + 1} / {n}
            </p>
            <p className="font-display italic text-cream text-xl">
              {GALLERY_ITEMS[lightbox].caption}
            </p>
          </div>

          {/* Botón cerrar */}
          <button
            className="absolute top-7 right-8 text-sand/40 hover:text-cream transition-colors duration-300"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen */}
          <div
            className="relative w-full max-w-5xl px-16 md:px-24"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[lightbox].src}
              alt={GALLERY_ITEMS[lightbox].alt}
              className="w-full max-h-[75vh] object-contain mx-auto"
            />
          </div>

          {/* Flecha anterior */}
          <button
            className="absolute left-3 md:left-6 text-sand/40 hover:text-cream transition-colors duration-300 p-2"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + n) % n : null) }}
            aria-label="Anterior"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flecha siguiente */}
          <button
            className="absolute right-3 md:right-6 text-sand/40 hover:text-cream transition-colors duration-300 p-2"
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % n : null) }}
            aria-label="Siguiente"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Miniaturas de navegación */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.alt}
                onClick={e => { e.stopPropagation(); setLightbox(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === lightbox ? 'bg-copper scale-125' : 'bg-sand/30 hover:bg-sand/60'
                }`}
                aria-label={`Ver ${item.caption}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

/* ── Contacto ─────────────────────────────────────────────────── */
function Contacto() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mojovobb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('ok'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const labelCls = 'block text-copper text-[10px] tracking-[0.35em] uppercase mb-2'
  const inputCls = 'w-full bg-cream border border-caramel/20 focus:border-copper outline-none px-4 py-3 text-espresso text-sm placeholder:text-caramel/40 transition-all duration-300'

  return (
    <section id="contacto" className="bg-sand scroll-mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2">

        {/* Panel izquierdo — info sobre sand */}
        <div data-reveal="left" className="px-8 md:px-16 py-16 md:py-32 md:border-r border-caramel/15">
          <p className="text-copper text-xs tracking-[0.4em] uppercase mb-6">Contáctenos</p>
          <h2 className="font-display text-espresso font-light leading-tight mb-12 md:mb-16"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            Estamos<br />para<br />servirte
          </h2>

          <div className="space-y-8 text-sm">
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-2">Ubicación</p>
              <p className="text-caramel">Ak. 58 #127-59</p>
              <p className="text-caramel">Centro Comercial Bulevar Niza</p>
              <p className="text-caramel/70">Bogotá, Colombia</p>
            </div>
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-2">Teléfono / WhatsApp</p>
              <a href="https://wa.me/16105688137" target="_blank" rel="noopener noreferrer"
                className="text-caramel hover:text-copper transition-colors">
                +1 (610) 568-8137
              </a>
            </div>
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-2">Correo</p>
              <a href="mailto:patitassocialclub@gmail.com"
                className="text-caramel hover:text-copper transition-colors">
                patitassocialclub@gmail.com
              </a>
            </div>
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-2">Redes sociales</p>
              <a href="https://instagram.com/patitassocialclub" target="_blank" rel="noopener noreferrer"
                className="text-caramel hover:text-copper transition-colors">
                @patitassocialclub
              </a>
            </div>
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-3">Escríbenos</p>
              <a
                href="https://wa.me/16105688137"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-copper text-copper text-xs tracking-widest uppercase px-6 py-3 hover:bg-copper hover:text-espresso transition-all duration-300"
              >
                Abrir WhatsApp
              </a>
            </div>
            <div>
              <p className="text-copper text-xs tracking-[0.3em] uppercase mb-2">Trabaja con nosotros</p>
              <a href="mailto:patitassocialclub@gmail.com"
                className="text-caramel hover:text-copper transition-colors">
                patitassocialclub@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Panel derecho — formulario sobre cream */}
        <div data-reveal="right" className="bg-cream px-8 md:px-16 py-16 md:py-32">
          <p className="text-copper text-[10px] tracking-[0.4em] uppercase mb-8">Envíanos un mensaje</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nombre</label>
                <input name="nombre" required placeholder="Tu nombre" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Apellido</label>
                <input name="apellido" required placeholder="Tu apellido" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Correo electrónico</label>
              <input name="email" type="email" required placeholder="correo@ejemplo.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Asunto</label>
              <input name="asunto" required placeholder="¿En qué podemos ayudarte?" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Mensaje</label>
              <textarea name="mensaje" required placeholder="Cuéntanos…" rows={5}
                className={`${inputCls} resize-none`} />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-espresso text-cream text-sm tracking-widest uppercase py-4 hover:bg-copper hover:text-espresso transition-colors duration-300 disabled:opacity-50"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            {status === 'ok' && (
              <p className="text-center text-sm text-copper font-display italic pt-1">
                Mensaje enviado. Te contactaremos pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm text-caramel/60 pt-1">
                Algo salió mal. Por favor intenta de nuevo.
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────── */
function Footer() {
  const navLinks = [
    { href: '#nosotros', label: 'Quiénes somos' },
    { href: '#menu',     label: 'Nuestro menú'  },
    { href: '#galeria',  label: 'Galería'        },
    { href: '#contacto', label: 'Contacto'       },
  ]

  return (
    <footer className="bg-espresso border-t border-sand/10 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Marca */}
          <div>
            <p className="font-display font-semibold text-cream tracking-[0.2em] text-lg mb-1">PATITAS</p>
            <p className="text-copper tracking-[0.4em] text-[9px] uppercase mb-5">Social Club</p>
            <p className="font-display italic text-sand/50 text-sm leading-relaxed">
              Para compartir con tu mejor amigo
            </p>
          </div>

          {/* Secciones */}
          <div>
            <p className="text-copper text-[10px] tracking-[0.4em] uppercase mb-5">Secciones</p>
            <ul className="space-y-3">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sand/50 text-sm hover:text-copper transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visítanos */}
          <div>
            <p className="text-copper text-[10px] tracking-[0.4em] uppercase mb-5">Visítanos</p>
            <p className="text-sand/50 text-sm leading-relaxed">
              Ak. 58 #127-59<br />
              Centro Comercial Bulevar Niza<br />
              Bogotá, Colombia
            </p>
            <a href="tel:+16105688137"
              className="block text-sand/50 text-sm mt-4 hover:text-copper transition-colors duration-300">
              +1 (610) 568-8137
            </a>
            <a href="mailto:patitassocialclub@gmail.com"
              className="block text-sand/50 text-sm mt-2 hover:text-copper transition-colors duration-300">
              patitassocialclub@gmail.com
            </a>
            <a href="https://instagram.com/patitassocialclub" target="_blank" rel="noopener noreferrer"
              className="block text-sand/50 text-sm mt-2 hover:text-copper transition-colors duration-300">
              @patitassocialclub
            </a>
          </div>
        </div>

        <div className="border-t border-sand/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sand/30 text-xs tracking-wide">
            © {new Date().getFullYear()} Patitas Social Club
          </p>
          <p className="text-sand/20 text-xs tracking-widest uppercase">
            Restaurante · Postres · Amor
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── WhatsApp FAB ─────────────────────────────────────────────── */
function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/16105688137"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-50 bg-[#25D366] text-white w-13 h-13 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[#25D366]/30 transition-all duration-300"
      style={{ width: '52px', height: '52px' }}
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function Page() {
  useReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ElegantDivider text="Restaurante · Postres · Amor" />
        <Features />
        <Historia />
        <ElegantDivider text="Para compartir con tu mejor amigo" />
        <MisionValores />
        <MenuPreview />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
