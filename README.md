# 🌐 Ruco (`ruco.ar`) — Sitio Web Oficial

> **"Tu presencia digital, cuidadosamente diseñada."**  
> *Ruco | Diseño web moderno · Páginas adaptadas a tu negocio, servicio o institución · 100% adaptadas a celulares.*

Sitio web corporativo y de conversión para la marca y agencia digital **Ruco** ([@ruco.ar](https://www.instagram.com/ruco.ar/)), desarrollado con estética **"Soft Editorial" en blanco cremita**, tipografía serif de alta gama (`Playfair Display`), detalles en bronce/cobre y tinta pino profundo, y una arquitectura técnica **100% Mobile-First** orientada a la captación de comercios locales y pymes en Argentina.

---

## 🎨 Sistema de Diseño "Soft Editorial & Blanco Cremita"

- **Instagram Oficial:** [@ruco.ar](https://www.instagram.com/ruco.ar/)
- **Isotipo Anclado en Header:** El logo circular de Instagram con el lazo de infinito 3D permanece **fijo en la barra de navegación superior** junto a la marca `ruco.ar`, con indicador verde de estado en línea.
- **Paleta Cromática:**
  - **Fondo Principal:** `#F8F4EE` (Blanco cremita / Warm Almond Cream).
  - **Superficie de Tarjetas:** `#FFFFFF` (Blanco puro con sombras suaves editoriales).
  - **Tinta Principal de Titulares:** `#16363B` (Pizarra Pino Profundo, extraído del feed de Instagram).
  - **Tinta de Lectura:** `#1C2426` (Carbón suave) y `#556669` (Pizarra secundaria).
  - **Acento Cobre & Bronce:** `#C88742` y `#B87333` (Calidez y destaque en botones y enlaces).
  - **Detalles Botánicos & Destellos:** Motivos minimalistas de hojas 🌿 y brillos ✨.
- **Tipografía:**
  - **Títulos & Encabezados:** `Playfair Display` (Serif suave de alto contraste y toques en itálica).
  - **Cuerpo & Navegación:** `Plus Jakarta Sans` (Geométrica moderna de máxima legibilidad).
  - **Detalles Técnicos:** `JetBrains Mono`.

---

## 🚀 Secciones & Funcionalidades Principales

1. **Header Fijo con Logo de Instagram Anclado:**
   - Foto de perfil oficial con reborde sutil y punto de actividad en verde esmeralda.
   - Enlace directo a `@ruco.ar` y botón directo a WhatsApp.

2. **Hero Section con Lienzo Interactivo 3D:**
   - Titular central: *"Tu presencia digital, cuidadosamente diseñada."*
   - Animación matemática en Canvas de la cinta de infinito (`canvas-loop.js`) con gradientes cálidos de cobre líquido.

3. **"Algunos de nuestros clientes..." (Showcase Interactivo & Enlaces Reales):**
   - **Teléfono interactivo** con pestañas que simula en tiempo real la navegación móvil en 0.4s.
   - **Botones con enlaces directos a los sitios web oficiales:**
     - 🛵 **MOTOS GMW:** Botón a [`https://gmwmotos.com`](https://gmwmotos.com)
     - 🥖 **Almacén Barrial PH:** Botón a [`https://almacenph.com`](https://almacenph.com)
     - 🌿 **Vivero Vía Verde:** Botón directo a WhatsApp para ver la maqueta botánica (enlace configurable).
     - 💃 **Estudio Julieta Sánchez:** Botón para consultar maqueta.
     - 🪵 **Carpintería Maderar:** Botón para consultar maqueta.

4. **"¿Por qué tener solo Instagram ya no alcanza?":**
   - Análisis comparativo que desarma la objeción típica del comerciante explicando por qué el 70% de las ventas urgentes locales ocurren en Google Maps y no en el feed de Instagram.

5. **Planes & Abono Transparente:**
   - Plan Landing Exprés.
   - Plan Web Pro + Catálogo.
   - Abono Mensual de Tranquilidad ($20.000 a $35.000 ARS/mes) con dominio anual cubierto, hosting y soporte continuo.

6. **Auditoría Visual Exprés a WhatsApp:**
   - Formulario de 3 campos que genera un mensaje prearmado para solicitar una maqueta visual sin cargo.

7. **Preguntas Frecuentes (FAQ):**
   - Acordeón interactivo con respuestas claras en lenguaje simple.

8. **Barra Móvil Flotante Fija (Mobile-First):**
   - Acceso inmediato a WhatsApp Directo y a Instagram `@ruco.ar`.

---

## 📁 Archivos del Proyecto

```text
rucoweb/
├── assets/
│   ├── logo/
│   │   ├── favicon.svg             # Ícono vectorial de infinito
│   │   ├── logo.svg                # Logo SVG con tipografía
│   │   └── rucoweb-avatar.jpg      # Foto de perfil oficial descargada de @ruco.ar
│   └── projects/
│       ├── almacen-fachada.jpg     # Foto real Almacén PH
│       ├── danza-hero.jpg          # Foto real Estudio Julieta Sánchez
│       ├── gmw-hero.jpg            # Foto real Taller Motos GMW
│       ├── maderar-hero.jpg        # Foto real Carpintería Maderar
│       └── vivero-hero.jpg         # Foto real Vivero Vía Verde
├── css/
│   └── styles.css                  # Sistema de diseño "Soft Editorial Blanco Cremita"
├── js/
│   ├── canvas-loop.js              # Animación matemática del lazo de infinito interactivo
│   └── main.js                     # Controlador de clientes, enlaces, FAQ y drawer móvil
├── index.html                      # Página principal con clientes y propuesta
├── planes.html                     # Página dedicada exclusiva para planes y abonos
└── README.md                       # Documentación técnica y comercial
```

---

## 📲 Cómo Probar la Web Localmente

Podés abrir [`rucoweb/index.html`](file:///c:/Users/Polo/Escritorio/Kiosco/rucoweb/index.html) directamente con doble clic en tu navegador, o correr un servidor local con PowerShell:

```powershell
cd c:\Users\Polo\Escritorio\Kiosco\rucoweb
python -m http.server 8080
```
Luego abrir `http://localhost:8080` en tu navegador.
