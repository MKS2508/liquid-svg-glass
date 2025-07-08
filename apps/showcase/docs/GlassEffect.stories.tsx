import type { Meta, StoryObj } from '@storybook/react';
import GlassEffect from '../src/components/GlassEffect';

const meta: Meta<typeof GlassEffect> = {
  title: 'Documentación/GlassEffect - Guía Completa',
  component: GlassEffect,
  parameters: {
    // Esta historia es específicamente para la documentación MDX
    docs: {
      page: null, // Desactiva la página de docs automática, usamos MDX
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal para la documentación
export const DocumentationExample: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '300px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <GlassEffect preset="dock" draggable={false}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#fff' }}>Ejemplo de Documentación</h3>
          <p style={{ margin: '10px 0 0', color: '#fff', opacity: 0.9 }}>
            Este es un ejemplo para la guía completa
          </p>
        </div>
      </GlassEffect>
    </div>
  ),
};