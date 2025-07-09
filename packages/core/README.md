# @liquid-svg-glass/core

![Liquid SVG Glass Core](../../assets/logo.png)

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framework Agnostic](https://img.shields.io/badge/Framework-Agnostic-FF6B6B?style=for-the-badge)
![Pure Functions](https://img.shields.io/badge/Pure-Functions-4ECDC4?style=for-the-badge)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-95E1D3?style=for-the-badge)

**Framework-agnostic utilities for creating liquid glass effects using SVG filters**

[📚 Documentation](../../README.md) • [🎨 React Components](../react) • [🔬 Technical Deep Dive](../../docs)

</div>

## 📦 Installation

```bash
npm install @liquid-svg-glass/core
# or
yarn add @liquid-svg-glass/core
# or
pnpm add @liquid-svg-glass/core
# or
bun add @liquid-svg-glass/core
```

## 🎯 Overview

The `@liquid-svg-glass/core` package provides framework-agnostic utilities for generating SVG displacement maps and filters that create realistic liquid glass effects. It's designed as a pure TypeScript library with no external dependencies, making it suitable for any JavaScript environment.

## ✨ Features

- **🔧 Pure Functions**: All utilities are pure functions with no side effects
- **📐 TypeScript First**: Full type definitions for excellent developer experience
- **🎨 SVG Generation**: Create complex SVG filters programmatically
- **🚀 Zero Dependencies**: Lightweight and fast with no external dependencies
- **🔬 Debug Support**: Built-in debug logging for development
- **📱 Universal**: Works in browsers, Node.js, and any JavaScript runtime

## 📖 API Reference

### `generateDisplacementMap(geometry, visual)`

The main utility function that generates SVG displacement maps for liquid glass effects.

```typescript
import { generateDisplacementMap } from '@liquid-svg-glass/core';

const result = generateDisplacementMap(
  {
    width: 300,
    height: 200,
    radius: 24
  },
  {
    scale: 60,
    r: 50,
    g: 55,
    b: 45,
    x: 'R',
    y: 'G',
    blur: 0.5
  }
);

// Returns:
// {
//   svgContent: string;    // Complete SVG markup
//   dataUri: string;       // Data URI for use in CSS/filters
//   filterAttributes: {    // Attributes for filter configuration
//     scale: number;
//     xChannelSelector: string;
//     yChannelSelector: string;
//   }
// }
```

### Type Definitions

#### `GeometryConfig`
```typescript
interface GeometryConfig {
  width: number;   // Width in pixels
  height: number;  // Height in pixels
  radius: number;  // Border radius in pixels
}
```

#### `VisualConfig`
```typescript
interface VisualConfig {
  scale: number;           // Displacement intensity (-1000 to 1000)
  r: number;               // Red channel value (0-255)
  g: number;               // Green channel value (0-255)
  b: number;               // Blue channel value (0-255)
  x: 'R' | 'G' | 'B';     // Channel for X displacement
  y: 'R' | 'G' | 'B';     // Channel for Y displacement
  blur?: number;          // Optional blur amount
}
```

#### `GlassConfig`
```typescript
interface GlassConfig {
  geometry: GeometryConfig;
  visual: VisualConfig;
}
```

### Debug Utilities

```typescript
import { beautyLog } from '@liquid-svg-glass/core';

// Pretty console logging with styled output
beautyLog({
  title: 'Glass Effect',
  type: 'info',
  message: 'Configuration applied',
  data: { scale: 60, blur: 15 }
});
```

## 💡 Usage Examples

### Basic SVG Filter Generation

```typescript
import { generateDisplacementMap } from '@liquid-svg-glass/core';

// Generate a displacement map for a glass panel
const glassPanel = generateDisplacementMap(
  { width: 400, height: 100, radius: 20 },
  { scale: 50, r: 60, g: 70, b: 50, x: 'R', y: 'B' }
);

// Use in HTML/CSS
const style = `
  .glass-element {
    backdrop-filter: url('${glassPanel.dataUri}');
  }
`;
```

### Custom Visual Effects

```typescript
// Subtle effect for UI elements
const subtleGlass = generateDisplacementMap(
  { width: 200, height: 60, radius: 30 },
  { scale: 30, r: 40, g: 45, b: 35, x: 'R', y: 'G', blur: 0.3 }
);

// Intense effect for hero sections
const intenseGlass = generateDisplacementMap(
  { width: 800, height: 400, radius: 0 },
  { scale: 120, r: 80, g: 90, b: 70, x: 'G', y: 'B', blur: 1.0 }
);
```

### Integration with Vanilla JavaScript

```html
<div id="glass-container">
  <p>Content with glass effect</p>
</div>

<script type="module">
  import { generateDisplacementMap } from '@liquid-svg-glass/core';
  
  const { dataUri } = generateDisplacementMap(
    { width: 300, height: 150, radius: 15 },
    { scale: 45, r: 55, g: 60, b: 50, x: 'R', y: 'G' }
  );
  
  const container = document.getElementById('glass-container');
  container.style.backdropFilter = `url('${dataUri}')`;
</script>
```

## 🔧 Advanced Configuration

### Understanding Scale Values

- **Positive values** (1-1000): Standard displacement direction
- **Negative values** (-1-1000): Inverted displacement effect
- **Zero**: No displacement (transparent glass)

### Channel Selection Strategy

- **x: 'R', y: 'G'**: Classic chromatic aberration
- **x: 'G', y: 'B'**: Cooler, tech-oriented effect
- **x: 'R', y: 'B'**: Warmer, organic distortion

### Performance Tips

1. **Memoize Results**: Cache generated SVGs when parameters don't change
2. **Optimize Blur**: Lower blur values render faster
3. **Reasonable Scales**: Keep scale values under 200 for most UI elements
4. **Reuse Filters**: Generate once, apply to multiple elements

## 🏗️ Architecture

The core package follows these principles:

- **Pure Functions**: No side effects or state mutations
- **Composable**: Small, focused functions that work together
- **Type Safe**: Comprehensive TypeScript definitions
- **Tree Shakeable**: Import only what you need

## 🤝 Contributing

See the [main repository README](../../README.md#contributing) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🔗 Links

- [Main Repository](../../README.md)
- [React Package](../react)
- [Live Demo](https://your-demo-url.com)
- [Storybook](https://your-storybook-url.com)

---

<div align="center">
  <sub>Part of the Liquid SVG Glass monorepo</sub>
</div>