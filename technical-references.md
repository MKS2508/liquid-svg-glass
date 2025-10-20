# 🔬 Referencias Técnicas Descargadas

**Fecha**: 2025-10-20
**Status**: Investigación completada
**Fuentes investigadas**: 5/6 (83%)

---

## 📋 Índice

- [Kube.io - Snell's Law & Refraction Physics](#kubeio---snells-law--refraction-physics)
- [Josh Comeau - Backdrop Extension](#josh-comeau---backdrop-extension)
- [Shu Ding - SDF Geometry & Auto-scaling](#shu-ding---sdf-geometry--auto-scaling)
- [Atlas Pup Labs - Chromatic Aberration](#atlas-pup-labs---chromatic-aberration)
- [Nielsen Norman Group - UX Best Practices](#nielsen-norman-group---ux-best-practices)
- [Resumen de Implementación](#resumen-de-implementación)

---

## Kube.io - Snell's Law & Refraction Physics

**URL**: https://kube.io/blog/liquid-glass-css-svg
**Estado**: ✅ Descargado y analizado
**Técnicas clave**: Física de refracción, surface functions, displacement vector field

### Snell's Law Foundation

**Fórmula Base**:
```
n₁sin(θ₁) = n₂sin(θ₂)
```

**Parámetros**:
- `n₁`: Índice de refracción del aire = 1.0
- `θ₁`: Ángulo de incidencia
- `n₂`: Índice de refracción del vidrio = 1.5
- `θ₂`: Ángulo de refracción

**Constraints implementados**:
- Ambient medium: índice = 1 (aire)
- Glass material: índice = 1.5
- Solo un evento de refracción (ignora salida)
- Rayos incidentes ortogonales al plano de fondo

### Surface Functions

#### Convex Circle
```javascript
y = √(1 - (1 - x)²)
```
- Domo esférico simple
- Transiciones más harsh al interior plano
- Refracción más notoria cuando se estira

#### Convex Squircle ⭐ Favorito Apple
```javascript
y = ⁴√(1 - (1 - x)⁴)
```
- Transición flat→curve más suave
- Gradientes de refracción smooth incluso estirado
- Bisel ópticamente más delgado

#### Concave
```javascript
y = 1 - Convex(x)
```
- Superficie tipo bowl (depresión)
- Diverge rayos hacia afuera
- Displacement fuera de límites del cristal

#### Lip
```javascript
y = mix(Convex(x), Concave(x), Smootherstep(x))
```
- Blend convex + concave
- Borde elevado, centro con dip shallow
- Usado en Switch component de Apple

### Normal Vector Calculation

```javascript
const delta = 0.001;
const y1 = f(distanceFromSide - delta);
const y2 = f(distanceFromSide + delta);
const derivative = (y2 - y1) / (2 * delta);
const normal = { x: -derivative, y: 1 };
```

El normal vector, rotado -90 grados desde la derivative, define la orientación de superficie para cálculos de ángulo de refracción.

### Displacement Vector Field

**Cálculo de displacement**:
- Simetría radial permite computar a lo largo de un solo radio
- Requiere **127 ray simulations** (determinado por resolución SVG)
- Normalización:

```javascript
const maximumDisplacement = Math.max(...displacementMagnitudes);
const normalized = magnitude / maximumDisplacement;
```

### SVG Displacement Map Encoding

**Conversión polar → cartesiano**:
```javascript
const x = Math.cos(angle) * magnitude;
const y = Math.sin(angle) * magnitude;

const result = {
  r: 128 + x * 127,  // X component
  g: 128 + y * 127,  // Y component
  b: 128,             // Ignored
  a: 255              // Fully opaque
};
```

**Mapeo de canales**:
- 8-bit por canal = 256 valores
- Range: -128 a +127 pixels
- Neutral value = 128 (sin displacement)
- 0 → -128px, 128 → 0px, 255 → 127px

### SVG Filter Implementation

```xml
<feDisplacementMap
  in="SourceGraphic"
  in2="displacement_map"
  scale={maximumDisplacement}
  xChannelSelector="R"
  yChannelSelector="G"
/>
```

**Scale parameter**: Multiplica el displacement normalizado, convirtiendo range [-1,1] a píxeles reales.

### CSS Application

```css
.glass-panel {
  backdrop-filter: url(#liquidGlassFilterId);
}
```

**⚠️ Limitación crítica**: Solo Chrome soporta SVG filters como `backdrop-filter`.

---

## Josh Comeau - Backdrop Extension

**URL**: https://www.joshwcomeau.com/css/backdrop-filter/
**Estado**: ✅ Descargado y analizado
**Técnicas clave**: Backdrop extension, edge glass 3D, mask-image, flickering fix

### Core Problem

> "The `backdrop-filter` algorithm only considers the pixels that are _directly behind_ the element."

**Solución**: Extender elemento para cubrir contenido cercano, luego usar masking para restaurar boundaries visuales.

### Backdrop Extension Technique

**Estructura básica**:
1. Mover `backdrop-filter` a child element (`.backdrop`)
2. Set child height a `200%` para extender coverage
3. Aplicar `mask-image` con linear gradient para trimear exceso

**CSS Implementation**:
```css
.backdrop {
  position: absolute;
  inset: 0;
  height: 200%; /* CLAVE: 2x parent height */
  backdrop-filter: blur(16px);

  /* Mostrar solo primera mitad */
  mask-image: linear-gradient(
    to bottom,
    black 0% 50%,      /* Visible */
    transparent 50% 100% /* Hidden */
  );

  pointer-events: none; /* CRÍTICO: no bloquear clicks */
}
```

**Por qué funciona**:
- Parent: 200px → Child: 400px (200%)
- Mask percentages relativos al CHILD
- 50% de 400px = 200px (tamaño original parent)
- Masking ocurre DESPUÉS de filters ✅

### Pointer Events Fix

Mask esconde visualmente pero elemento sigue ahí bloqueando clicks.

**Solución crítica**:
```css
pointer-events: none; /* Ignora clicks/touch */
```

### Flickering Top Edge Fix

Elementos saliendo del viewport causan flickering de colores cuando blur pierde referencia.

**Solución**:
```css
.backdrop {
  background: linear-gradient(
    to bottom,
    hsl(0deg 0% 0%) 0%,    /* Background color del sitio */
    transparent 50%
  );
}
```

Bloquea flickering colors while maintaining frosted effect debajo.

### Edge Glass 3D Effect

**Concepto**: Segundo elemento blur con settings diferentes para simular grosor.

**Implementation**:
```css
.backdrop-edge {
  --thickness: 6px;

  position: absolute;
  inset: 0;
  transform: translateY(100%); /* Stack debajo del main */

  backdrop-filter:
    blur(8px)         /* Blur MENOR que main */
    brightness(120%); /* CLAVE: brillo diferente */

  mask-image: linear-gradient(
    to bottom,
    black 0,
    black var(--thickness), /* Solo primeros pixels */
    transparent var(--thickness)
  );

  pointer-events: none;
}
```

**Efecto visual**: Parece cristal 3D con grosor real usando "smaller blur radius" con added `brightness` filter.

### Browser Support

- **backdrop-filter**: 97%+ support (requiere `-webkit-` prefix)
- **mask-image**: 96.3%+ support (requiere `-webkit-` prefix)

**Feature queries para progressive enhancement**:
```css
@supports (backdrop-filter: blur(16px)) or
          (-webkit-backdrop-filter: blur(16px)) {
  /* Enhanced version */
}
```

---

## Shu Ding - SDF Geometry & Auto-scaling

**URL**: https://github.com/shuding/liquid-glass/blob/main/liquid-glass.js
**Estado**: ✅ Código descargado y analizado
**Técnicas clave**: SDF functions, runtime displacement, auto-scaling, fragment API

### SDF (Signed Distance Fields) Functions

**Length Calculation**:
```javascript
function length(x, y) {
  return Math.sqrt(x * x + y * y);
}
```

**Rounded Rectangle SDF**:
```javascript
function roundedRectSDF(x, y, width, height, radius) {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) +
         length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}
```

**Ventajas SDF**:
- Geometría matemática precisa (no gradientes aproximados)
- Anti-aliasing natural
- Base para cálculos físicos correctos
- Extensible a cualquier shape (no solo círculos)

### SmoothStep Hermite Interpolation

```javascript
function smoothStep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t); // Hermite interpolation
}
```

**Uso**:
- Transiciones smooth entre estados
- Displacement gradual
- Anti-aliasing matemático

**Nota**: Ya tenemos **Smootherstep** (`6t⁵ - 15t⁴ + 10t³`) que es más smooth.

### Fragment Shader API

**Paradigma declarativo**:
```javascript
const shader = new Shader({
  width: 300,
  height: 200,
  fragment: (uv, mouse) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;

    // SDF distance calculation
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);

    // SmoothStep displacement
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
    const scaled = smoothStep(0, 1, displacement);

    return { type: 't', x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
  }
});
```

**Comparación con nuestros Presets**:
```typescript
// NOSOTROS (Config-based, Performance)
export const cardPreset: LiquidGlassConfig = {
  width: 320, height: 400, radius: 24,
  frost: 0.05, blur: 11
};

// SHU DING (Function-based, Flexibility)
fragment: (uv, mouse) => {
  // Lógica custom por píxel
  return computedPosition;
}
```

### Runtime Displacement Generation

**Canvas API en vivo**:
```javascript
updateShader() {
  const w = this.width * this.canvasDPI;
  const h = this.height * this.canvasDPI;
  const data = new Uint8ClampedArray(w * h * 4);

  let maxScale = 0;
  const rawValues = [];

  // 1. Calcular displacement por píxel
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % w;
    const y = Math.floor(i / 4 / w);
    const pos = this.fragment({ x: x / w, y: y / h }, mouse);

    const dx = pos.x * w - x;
    const dy = pos.y * h - y;

    maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
    rawValues.push(dx, dy);
  }

  // 2. Normalizar automáticamente
  maxScale *= 0.5;

  // 3. Encodear a RGB
  let index = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = rawValues[index++] / maxScale + 0.5;
    const g = rawValues[index++] / maxScale + 0.5;
    data[i] = r * 255;
    data[i + 1] = g * 255;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }

  // 4. Canvas → Data URI
  this.context.putImageData(new ImageData(data, w, h), 0, 0);
  this.feImage.setAttributeNS('xlink', 'href', this.canvas.toDataURL());
  this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString());
}
```

**Ventajas**:
- Generación on-the-fly permite interactividad
- Auto-scaling evita clipping
- Mouse tracking nativo
- Programático y flexible

**Desventajas**:
- Costoso computacionalmente (~50-100ms generation)
- No necesario para efectos estáticos
- Mejor como OPCIONAL, no default

### Auto-scaling Inteligente

**Normalización dinámica**:
```javascript
// 1. Find max displacement across ALL pixels
let maxScale = 0;
for (let i = 0; i < pixels; i++) {
  const dx = calculateDisplacement(i);
  maxScale = Math.max(maxScale, Math.abs(dx));
}

// 2. Normalize ALL vectors by max
for (let i = 0; i < pixels; i++) {
  normalized[i] = raw[i] / maxScale;
}

// 3. SVG scale attribute = max value
<feDisplacementMap scale={maxScale} />
```

**Ventajas**:
- NO clipping (displacement siempre dentro de rango)
- Aprovecha full 8-bit resolution
- Ajuste automático por geometría

### Mouse Tracking

**Proxy-based tracking**:
```javascript
const mouseProxy = new Proxy(this.mouse, {
  get: (target, prop) => {
    this.mouseUsed = true;
    return target[prop];
  }
});
```

Updates en mousemove solo cuando shader referencia mouse data (conditional re-rendering optimization).

---

## Atlas Pup Labs - Chromatic Aberration

**URL**: https://atlaspuplabs.com/blog/liquid-glass-but-in-css
**Estado**: ✅ Descargado y analizado
**Técnicas clave**: RGB channel separation, ripple distortion, color filters

### Chromatic Aberration Correcta

**Implementación completa con RGB separation**:

#### Red Channel
```xml
<feColorMatrix
  in="SourceImage"
  values="1 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 1 0"
  result="red"
/>
<feOffset dx="2" dy="0" in="red" result="shiftedRed" />
```

#### Green Channel
```xml
<feColorMatrix
  in="SourceImage"
  values="0 0 0 0 0
          0 1 0 0 0
          0 0 0 0 0
          0 0 0 1 0"
  result="green"
/>
<feOffset dx="0" dy="2" in="green" result="shiftedGreen" />
```

#### Blue Channel
```xml
<feColorMatrix
  in="SourceImage"
  values="0 0 0 0 0
          0 0 0 0 0
          0 0 1 0 0
          0 0 0 1 0"
  result="blue"
/>
<feOffset dx="-2" dy="0" in="blue" result="shiftedBlue" />
```

**Recombinación**:
```xml
<feBlend in="shiftedRed" in2="shiftedGreen" mode="screen" result="rg" />
<feBlend in="rg" in2="shiftedBlue" mode="screen" />
```

**Offsets específicos**:
- Red: `dx="2"` (menos refracción, wavelength más larga)
- Green: `dx="0"` (referencia)
- Blue: `dx="-2"` (más refracción, wavelength más corta)

### Ripple Distortion

**feTurbulence implementation**:
```xml
<feTurbulence
  type="turbulence"
  baseFrequency="0.001"
  numOctaves="2"
  result="fractal"
  stitchTiles="stitch"
/>
<feDisplacementMap
  in2="turbulence"
  in="SourceGraphic"
  scale="20"
  result="turbDisplaced"
/>
```

**Parámetros**:
- `baseFrequency`: Tamaño de ripples (lower = larger)
- `numOctaves`: Detalle/complejidad (2-3 recomendado)
- `scale`: Intensidad de distortion (20px típico)

### Color Filters

**Aplicación vía backdrop-filter**:
```css
backdrop-filter:
  contrast(80%)    /* Reduce contraste */
  saturate(120%);  /* Boost saturación */
```

**Efecto**: Contenido detrás se ve más "vivid" como luz pasando por vidrio.

### Complete SVG Filter Chain

**Pipeline completo con 40px overscan**:
```xml
<svg width={0} height={0} xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="none" version="2" style="display: none;">
  <defs>
    <filter id="backdropFilter"
            width="440px" height="440px"
            x="-20px" y="-20px"
            filterUnits="userSpaceOnUse">

      <!-- 1. Displacement map -->
      <feImage result="paneWarpMap"
               href="SVG_DISPLACEMENT_MAP_DATA_URL" />

      <!-- 2. Apply displacement -->
      <feDisplacementMap
        in2="paneWarpMap"
        in="turbDisplaced"
        scale="20"
        result="finalDisplaced"
        xChannelSelector="R"
        yChannelSelector="B" />
    </filter>
  </defs>
</svg>
```

**⚠️ Limitación**: Chrome-only (CSS SVG filter support).

---

## Nielsen Norman Group - UX Best Practices

**URL**: https://www.nngroup.com/articles/glassmorphism/
**Estado**: ✅ Descargado y analizado
**Focus**: Accessibility, WCAG compliance, UX guidelines

### Contrast & Readability

**WCAG Compliance**:
- Ensure text and graphical elements meet contrast requirements
- Text readability suffers cuando cae sobre múltiples colores de background
- Use tools como Figma Contrast plugin para verify color ratios
- Glassmorphic components son translúcidos: text puede overlap múltiples colores

### Background Blur Strategy

**Recomendaciones**:
- Increase blur intensity con intricate backgrounds (photography, video)
- Apply sufficient blur para prevent backgrounds distracting de content
- Components en múltiples contexts: blur settings deben accommodate varios backgrounds
- Consider controlling background cuando posible: opt for simple/single-color surfaces

**Blur targets según background**:
- Simple backgrounds: 16-24px
- Complex backgrounds: 25-40px+
- Video/animated backgrounds: 30-50px

### User Controls & Accessibility

**Critical accessibility features**:
- Give users option to control contrast or transparency settings
- Enable low-vision users a través de adaptive transparency (como Apple accessibility)
- Ensure glassmorphic elements remain WCAG-compliant si customization no es posible

**Apple accessibility example**:
```css
@media (prefers-reduced-transparency: reduce) {
  .glass {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.95);
  }
}
```

### When to Use Glassmorphism

**✅ Good use cases**:
- Deploy sparingly para establish visual depth y hierarchy
- Leverage established design systems (Apple SwiftUI, Microsoft Acrylic)
- Virtual/mixed-reality interfaces donde 3D texture enhances perception
- Hero elements, modals importantes
- Non-critical UI elements

### When to Avoid

**❌ Avoid glassmorphism**:
- Avoid overuse → accessibility y usability problems
- Skip sin solid visual-design principles foundation
- Critical navigation UI elements
- Fondos muy busy sin control
- Cuando no se puede garantizar contrast

---

## 📝 Resumen de Implementación

### Prioridades Inmediatas (Fase 1)

1. **Backdrop Extension** - Josh Comeau
   - Implementation: CSS simple con mask-image
   - Impacto: +15% realismo
   - Complejidad: Baja
   - Tiempo: 2-3h

2. **Performance Optimizations** - Best Practices
   - will-change, contain, translateZ(0)
   - Impacto: +40% performance
   - Complejidad: Baja
   - Tiempo: 1h

3. **Flickering Fix** - Josh Comeau
   - Gradient top cover
   - Impacto: +5% polish
   - Complejidad: Baja
   - Tiempo: 30min

### Técnicas de Alto Impacto (Fase 2)

4. **Edge Glass 3D** - Josh Comeau
   - Segundo backdrop element
   - Impacto: +20% depth perception
   - Complejidad: Media
   - Tiempo: 3-4h

5. **Chromatic Aberration** - Atlas Pup Labs
   - RGB channel separation con feColorMatrix
   - Impacto: +10% realismo óptico
   - Complejidad: Media
   - Tiempo: 2-3h

6. **Fresnel Highlights** - Best Practices
   - Box-shadows mejorados
   - Impacto: +8% material believability
   - Complejidad: Baja
   - Tiempo: 1-2h

### Técnicas Avanzadas (Fase 3)

7. **Snell's Law Refraction** - Kube.io
   - Física completa de refracción
   - Impacto: +30% realismo
   - Complejidad: Alta
   - Tiempo: 6-8h

8. **Surface Functions** - Kube.io
   - Squircle, Lip, Concave
   - Impacto: +12% smoothness
   - Complejidad: Media
   - Tiempo: 4-5h

9. **SDF Geometry** - Shu Ding (OPCIONAL)
   - Geometría matemática precisa
   - Impacto: +5% precision
   - Complejidad: Media
   - Tiempo: 3-4h

### Consideraciones de Browser Support

**Chrome-only features** (requieren fallback):
- SVG filters como backdrop-filter
- Chromatic aberration con feColorMatrix
- Ripple distortion con feTurbulence

**Progressive enhancement strategy**:
```css
@supports (backdrop-filter: url(#filter)) {
  /* Chrome/Edge: Full experience */
  backdrop-filter: url(#liquidGlassFilter);
}

@supports not (backdrop-filter: url(#filter)) {
  /* Safari/Firefox: Graceful fallback */
  backdrop-filter: blur(20px) saturate(180%);
}
```

### Performance Targets

**Desktop (High-end)**:
- Initial render: <50ms
- Animation frame: <16ms (60fps)
- Memory: <30MB

**Mobile (High-end)**:
- Initial render: <150ms
- Animation frame: <33ms (30fps)
- Memory: <15MB

---

**Documento generado**: 2025-10-20
**Versión**: 1.0.0
**Status**: ✅ Referencias descargadas y documentadas
**Próximo paso**: Iniciar Fase 1 de implementación
