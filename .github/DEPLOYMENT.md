# 🚀 Deployment Guide

Este monorepo está configurado para desplegar automáticamente tres componentes usando GitHub Actions:

## 📦 Componentes que se despliegan

### 1. **Paquetes NPM** 
- `@liquid-svg-glass/core` - Utilidades base
- `@liquid-svg-glass/react` - Componentes React

### 2. **GitHub Pages**
- **Showcase App** - Landing page principal en `/`  
- **Storybook** - Documentación en `/storybook/`

## 🔧 Configuración inicial

### Paso 1: Secrets de GitHub
Necesitas configurar estos secrets en tu repositorio:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Agrega estos secrets:

```
NPM_TOKEN=your_npm_token_here
```

Para obtener tu NPM token:
```bash
npm login
npm token create --access=public
```

### Paso 2: Habilitar GitHub Pages
1. Ve a **Settings** → **Pages**
2. Source: **GitHub Actions**
3. No necesitas configurar nada más

### Paso 3: Actualizar URLs en package.json
Cambia `your-username` por tu usuario real de GitHub en:
- `packages/core/package.json`
- `packages/react/package.json`

## 🚀 Proceso de deployment

### Deployment automático
El deployment se ejecuta automáticamente cuando:
- Haces push a la rama `main`
- Creas un release

### Deployment manual
Puedes ejecutar el deployment manualmente:
1. Ve a **Actions** → **Deploy Monorepo**
2. Haz clic en **Run workflow**

## 📋 Workflows disponibles

### 1. `deploy.yml` - Deployment principal
- ✅ Build y test de todos los paquetes
- 📦 Publica paquetes NPM (solo en releases)
- 🌐 Despliega a GitHub Pages
- 📊 Múltiples versiones de Node.js

### 2. `release.yml` - Releases automáticos
- 🏷️ Crea releases automáticamente
- 📝 Genera changelog desde commits
- 🔗 Links a demo y documentación

### 3. `pages.yml` - Configuración de Pages
- ⚙️ Configura GitHub Pages
- 🔧 Ejecutable manualmente

## 🌐 URLs de deployment

Después del deployment exitoso:

- **Showcase App (Landing)**: `https://your-username.github.io/liquid-svg-glass/`
- **Storybook**: `https://your-username.github.io/liquid-svg-glass/storybook/`

## 📦 Paquetes NPM

Los paquetes se publican automáticamente en:
- https://www.npmjs.com/package/@liquid-svg-glass/core
- https://www.npmjs.com/package/@liquid-svg-glass/react

## 🛠️ Scripts disponibles

```bash
# Build completo
bun run build

# Build individual
bun run build:core
bun run build:react
bun run build:showcase
bun run build:storybook

# Desarrollo
bun run dev           # Showcase app
bun run dev:storybook # Storybook
bun run dev:all       # Ambos concurrentemente
```

## 🐛 Troubleshooting

### Error: "NPM_TOKEN not found"
- Asegúrate de haber configurado el secret `NPM_TOKEN`
- Verifica que el token tenga permisos de publicación

### Error: "Pages deployment failed"
- Verifica que GitHub Pages esté habilitado
- Asegúrate de que el source sea "GitHub Actions"

### Error: "Build failed"
- Revisa los logs en la pestaña Actions
- Verifica que todos los paquetes se construyan localmente

### Paquetes no se publican
- Los paquetes solo se publican en releases
- Crea un release para disparar la publicación

## ✨ Características

- 🔄 **CI/CD completo** - Build, test y deploy automático
- 📦 **Versionado automático** - Semantic releases
- 🌐 **Múltiples targets** - NPM + GitHub Pages
- 🧪 **Testing** - Matriz de versiones de Node.js
- 📊 **Artefactos** - Builds guardados temporalmente
- 🔔 **Notificaciones** - Status de deployment

## 📚 Próximos pasos

1. Personaliza las URLs con tu usuario de GitHub
2. Configura los secrets necesarios
3. Haz push a `main` para el primer deployment
4. Crea tu primer release para publicar en NPM

¡Tu monorepo está listo para desplegarse automáticamente! 🎉