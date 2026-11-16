# MINNA — landing page

React + Vite + GSAP. Se publica en GitHub Pages con cada push a `main` (ver `.github/workflows/deploy.yml`).

```bash
npm install
npm run dev      # desarrollo
npm run build    # produce dist/
```

## Datos que se cambian en un solo lugar

`src/config.js` → link al mensaje directo de Instagram.

## Tipografías

- **Comfortaa** (cuerpo) y **Caveat Brush** (notas a mano): Google Fonts.
- **Vintage Valentine** (títulos): archivo propio en `src/assets/fonts/vintage-valentine.woff2`
  (subset latino convertido desde el `.otf` original de SiapGraph).

### Licencia de Vintage Valentine

La versión descargada de BeFonts es **solo para uso personal**. Para usarla en un sitio de un
servicio comercial hace falta la licencia *Corporate* del diseñador:
<https://siapgraph.com/>. Mientras no se compre, conviene considerar el sitio como no licenciado
para esta fuente.

## Imágenes

Los recortes de Minna (`src/assets/img/minna-*.webp`) tienen el fondo blanco eliminado
(transparencia). La flor del logo (`flower.png`) se usa como máscara CSS, por eso toma el color
del texto en cada sección.
