# @liquid-svg-glass/react

![Liquid SVG Glass React](../../assets/logo.png)

<div align="center">

![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13+-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Components](https://img.shields.io/badge/Components-2-FF6B6B?style=for-the-badge)

**Sophisticated React components for creating liquid glass effects with real-time distortion**

[📚 Documentation](../../README.md) • [🔧 Core Utilities](../core) • [🎨 Storybook](https://your-storybook-url.com) • [🎮 Live Demo](https://your-demo-url.com)

</div>

## 📦 Installation

```bash
# Install both packages - core is a peer dependency
npm install @liquid-svg-glass/core @liquid-svg-glass/react
# or
yarn add @liquid-svg-glass/core @liquid-svg-glass/react
# or
pnpm add @liquid-svg-glass/core @liquid-svg-glass/react
# or
bun add @liquid-svg-glass/core @liquid-svg-glass/react
```

## 🚀 Quick Start

```tsx
import { GlassEffect } from '@liquid-svg-glass/react';

function App() {
  return (
    <GlassEffect preset="dock" draggable>
      <nav>Your glassmorphic navigation</nav>
    </GlassEffect>
  );
}
```

## 🎯 Overview

The `@liquid-svg-glass/react` package provides React components that leverage SVG filters and displacement mapping to create stunning liquid glass effects. Built on top of `@liquid-svg-glass/core`, it offers a simple yet powerful API for adding glassmorphism to your React applications.

## ✨ Features

- **🎨 4 Built-in Presets**: `dock`, `pill`, `bubble`, and `free` configurations
- **🎮 Draggable Support**: GSAP-powered drag interactions out of the box
- **📐 Auto-sizing**: Automatically adapts to content dimensions
- **🔧 Fully Customizable**: Control every aspect of the effect
- **⚡ Performance Optimized**: Memoized rendering and efficient updates
- **📱 Responsive**: Works seamlessly across all device sizes
- **♿ Accessible**: Maintains proper contrast and readability

## 📖 Components

### `<GlassEffect />`

The main component for creating liquid glass effects.

```tsx
import { GlassEffect } from '@liquid-svg-glass/react';

<GlassEffect
  preset="dock"
  draggable={true}
  width={400}
  height={100}
  blur={15}
  frost={0.25}
  r={60} g={70} b={50}
  onMove={(position) => console.log('Moved to:', position)}
>
  <div>Your content here</div>
</GlassEffect>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **preset** | `'dock' \| 'pill' \| 'bubble' \| 'free'` | `'dock'` | Predefined configuration preset |
| **children** | `ReactNode` | - | Content to render inside the glass effect |
| **draggable** | `boolean` | `false` | Enable drag functionality via GSAP |
| **autoSize** | `boolean` | `false` | Automatically size to content |
| **width** | `number` | preset value | Width in pixels |
| **height** | `number` | preset value | Height in pixels |
| **radius** | `number` | preset value | Border radius in pixels |
| **frost** | `number` | preset value | Frost intensity (0-1) |
| **blur** | `number` | preset value | Background blur amount |
| **displace** | `number` | preset value | Displacement intensity |
| **scale** | `number` | preset value | Displacement scale factor |
| **r** | `number` | preset value | Red channel displacement (0-255) |
| **g** | `number` | preset value | Green channel displacement (0-255) |
| **b** | `number` | preset value | Blue channel displacement (0-255) |
| **x** | `'R' \| 'G' \| 'B'` | preset value | X-axis displacement channel |
| **y** | `'R' \| 'G' \| 'B'` | preset value | Y-axis displacement channel |
| **border** | `number` | preset value | Border opacity (0-1) |
| **alpha** | `number` | preset value | Overall opacity (0-1) |
| **lightness** | `number` | preset value | Background lightness (0-100) |
| **blend** | `CSSProperties['mixBlendMode']` | preset value | CSS blend mode |
| **initialPosition** | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | Initial position for draggable elements |
| **onMove** | `(position: { x: number; y: number }) => void` | - | Callback when element is moved |
| **debug** | `boolean` | `false` | Enable debug mode with visual overlays |

### `<DraggableItem />`

A standalone component for making any element draggable using GSAP.

```tsx
import { DraggableItem } from '@liquid-svg-glass/react';

<DraggableItem
  draggable={true}
  initialPosition={{ x: 100, y: 50 }}
  onMove={(pos) => console.log('Dragged to:', pos)}
>
  <div>Drag me around!</div>
</DraggableItem>
```

## 🎨 Available Presets

### `dock` - Navigation bars and app docks
```tsx
<GlassEffect preset="dock">
  <nav>Perfect for navigation bars</nav>
</GlassEffect>
```
- **Dimensions**: 336×96px
- **Style**: Subtle distortion, high readability
- **Use cases**: Navigation bars, toolbars, docks

### `pill` - Buttons and compact elements
```tsx
<GlassEffect preset="pill">
  <button>Click me</button>
</GlassEffect>
```
- **Dimensions**: 200×60px
- **Style**: Rounded, compact, interactive
- **Use cases**: Buttons, badges, pills, tags

### `bubble` - Floating circular elements
```tsx
<GlassEffect preset="bubble">
  <div>💎</div>
</GlassEffect>
```
- **Dimensions**: 150×150px
- **Style**: Square format, pronounced effect
- **Use cases**: Floating buttons, avatars, icons

### `free` - Fully customizable
```tsx
<GlassEffect preset="free" width={500} height={300}>
  <div>Complete control</div>
</GlassEffect>
```
- **Dimensions**: 300×150px
- **Style**: Neutral base for customization
- **Use cases**: Custom implementations

## 💡 Usage Examples

### Static Glass Panel
```tsx
<GlassEffect preset="dock" draggable={false}>
  <div className="glass-panel">
    <h2>Welcome</h2>
    <p>This is a static glass panel</p>
  </div>
</GlassEffect>
```

### Interactive Draggable Card
```tsx
const [position, setPosition] = useState({ x: 0, y: 0 });

<GlassEffect
  preset="bubble"
  draggable={true}
  initialPosition={position}
  onMove={setPosition}
>
  <div className="card">
    <h3>Drag Me!</h3>
    <p>Position: {position.x}, {position.y}</p>
  </div>
</GlassEffect>
```

### Auto-sizing Button
```tsx
<GlassEffect preset="pill" autoSize>
  <button className="dynamic-button">
    This button sizes to its content automatically
  </button>
</GlassEffect>
```

### Custom Configuration
```tsx
<GlassEffect
  preset="free"
  width={600}
  height={400}
  radius={32}
  frost={0.3}
  blur={20}
  scale={-150}
  r={70} g={80} b={60}
  blend="screen"
  debug={process.env.NODE_ENV === 'development'}
>
  <div className="hero-content">
    <h1>Stunning Glass Effect</h1>
    <p>With complete customization</p>
  </div>
</GlassEffect>
```

## 🎯 Exported Utilities

### `glassPresets`

Access all preset configurations programmatically:

```tsx
import { glassPresets } from '@liquid-svg-glass/react';

console.log(glassPresets.dock);
// {
//   width: 336,
//   height: 96,
//   radius: 22,
//   frost: 0.3,
//   blur: 11,
//   ...
// }

// Create custom preset based on existing one
const customPreset = {
  ...glassPresets.pill,
  width: 250,
  blur: 20
};
```

### TypeScript Types

```tsx
import type { GlassEffectProps } from '@liquid-svg-glass/react';

const MyComponent: React.FC<GlassEffectProps> = (props) => {
  return <GlassEffect {...props} />;
};
```

## 🔧 Advanced Usage

### Performance Optimization

```tsx
import { memo } from 'react';
import { GlassEffect } from '@liquid-svg-glass/react';

// Memoize for static glass effects
const StaticGlass = memo(() => (
  <GlassEffect preset="dock" draggable={false}>
    <nav>Static navigation</nav>
  </GlassEffect>
));

// Use CSS transforms for better performance
const AnimatedGlass = () => (
  <GlassEffect 
    preset="bubble"
    style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
  >
    <div>Animated content</div>
  </GlassEffect>
);
```

### Responsive Design

```tsx
const ResponsiveGlass = () => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <GlassEffect
      preset="dock"
      width={isMobile ? 300 : 500}
      height={isMobile ? 80 : 120}
      blur={isMobile ? 8 : 15}
    >
      <div>Responsive glass effect</div>
    </GlassEffect>
  );
};
```

### Debug Mode

```tsx
// Enable debug mode in development
<GlassEffect
  preset="free"
  debug={process.env.NODE_ENV === 'development'}
>
  <div>Debug information will be shown</div>
</GlassEffect>
```

## 🎨 Styling

The component uses CSS modules and can be styled with custom CSS:

```css
/* Override default styles */
.glass-effect-wrapper {
  /* Your custom styles */
}

/* Target the glass container */
[data-glass-effect="true"] {
  /* Your overrides */
}
```

## 🌟 Best Practices

1. **Start with presets** - Use built-in presets and customize as needed
2. **Consider performance** - Use `draggable={false}` for static elements
3. **Test on devices** - Ensure effects work well on various screen sizes
4. **Mind the contrast** - Ensure text remains readable over glass effects
5. **Use autoSize wisely** - Great for dynamic content, but can cause reflows

## 🤝 Contributing

See the [main repository README](../../README.md#contributing) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🔗 Links

- [Main Repository](../../README.md)
- [Core Package](../core)
- [Interactive Storybook](https://your-storybook-url.com)
- [Live Demo](https://your-demo-url.com)
- [GitHub Issues](https://github.com/your-username/liquid-svg-glass/issues)

---

<div align="center">
  <sub>Part of the Liquid SVG Glass monorepo</sub>
</div>