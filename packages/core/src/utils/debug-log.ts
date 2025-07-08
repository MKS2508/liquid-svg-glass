/**
 * @file Logger de depuración optimizado para el Efecto de Cristal Líquido.
 * @description Utilidad de logging nativa de TypeScript diseñada específicamente para la depuración de filtros SVG,
 * animaciones GSAP y monitoreo del flujo de trabajo del efecto de cristal.
 * Proporciona un logging contextual y visualmente diferenciado para facilitar el desarrollo.
 * @see {@link https://github.com/your-username/react-liquid-glass/blob/main/definitive.md#%EF%B8%8F-sistema-de-debug-logging-avanzado | Sistema de Debug Logging Avanzado en `definitive.md`}
 */

// Tipos e Interfaces
/**
 * Niveles de log para categorizar los mensajes.
 */
export const LogLevel = {
  INFO: 'info',
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug'
} as const;

/**
 * Tipo de nivel de log.
 */
export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

/**
 * Contexto adicional para los mensajes de log.
 */
export interface LogContext {
  /** Nombre del componente que genera el log. */
  component?: string;
  /** Operación específica que se está logueando. */
  operation?: string;
  /** Duración de la operación en milisegundos. */
  duration?: number;
  /** Metadatos adicionales relevantes para el log. */
  metadata?: Record<string, unknown>;
  /** Ubicación del código desde donde se llamó al log. */
  calledFrom?: string;
}

// Estilos específicos de operación
const OPERATION_STYLES: Record<string, string> = {
  // Operaciones del motor SVG
  'SVG_CONSTRUCTION': 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #FFFFFF;',
  'SVG_ENCODING': 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #FFFFFF;',
  'BORDER_CALC': 'background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #FFFFFF;',
  'FILTER_OPERATION': 'background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333333;',
  
  // Operaciones del efecto de cristal
  'CONFIG_APPLICATION': 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #FFFFFF;',
  'GLASS_SUMMARY': 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #FFFFFF;',
  
  // Operaciones del elemento arrastrable
  'GSAP_SETUP': 'background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: #FFFFFF;',
  'GSAP_READY': 'background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); color: #FFFFFF;',
  'POSITION_CHANGE': 'background: linear-gradient(135deg, #96fbc4 0%, #f9f047 100%); color: #333333;',
  
  // Operaciones generales
  'PERFORMANCE': 'background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); color: #333333;',
  'LIFECYCLE': 'background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333333;',
  'CONFIG_CHANGE': 'background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%); color: #333333;'
};

/**
 * Describe las propiedades de un objeto para el logging estructurado.
 */
export interface PropertyDescriptions {
  [key: string]: string;
}

/**
 * Define estilos CSS personalizados para las propiedades en el logging estructurado.
 */
export interface CustomPropertyStyles {
  [key: string]: {
    key?: Record<string, string>;
    value?: Record<string, string>;
    description?: Record<string, string>;
  };
}

/**
 * Datos para el log de construcción de SVG.
 */
export interface SVGConstructionData {
  width: number;
  height: number;
  radius: number;
  border: number;
  calculatedBorder: number;
  blend: string;
  lightness: number;
  alpha: number;
  blur: number;
}

/**
 * Datos para el log de configuración de GSAP Draggable.
 */
export interface GSAPSetupData {
  type: string;
  bounds?: string;
  element: string;
  draggable: boolean;
}

/**
 * Datos para el log de aplicación de configuración.
 */
export interface ConfigApplicationData {
  preset: string;
  customProps: string[];
  mergedConfig: Record<string, unknown>;
}

/**
 * Métrica de rendimiento para el log.
 */
export interface PerformanceMetric {
  operation: string;
  duration: number;
  startTime: number;
  endTime: number;
}

// Tema optimizado con solo estilos esenciales
const CONSOLE_STYLES = {
  prefix: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #FFFFFF; font-weight: bold; padding: 6px 14px; border-radius: 8px; margin-right: 12px; font-size: 1.05em; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); box-shadow: 0 2px 4px rgba(0,0,0,0.15); letter-spacing: 0.5px;',
  info: 'background: rgba(135, 206, 235, 0.15); color: #87CEEB; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(135, 206, 235, 0.3);',
  success: 'background: rgba(50, 205, 50, 0.15); color: #32CD32; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(50, 205, 50, 0.3);',
  warn: 'background: rgba(255, 165, 0, 0.15); color: #FFA500; font-weight: 600; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255, 165, 0, 0.3);',
  error: 'background: rgba(255, 68, 68, 0.15); color: #FF4444; font-weight: bold; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255, 68, 68, 0.3);',
  debug: 'background: rgba(136, 136, 136, 0.1); color: #888; font-style: italic; padding: 4px 10px; border-radius: 6px;',
  highlight: 'color: #FFD700; font-weight: bold;',
  value: 'color: #FF6347; font-weight: bold;',
  operation: 'font-weight: bold; padding: 4px 10px; border-radius: 6px; margin: 0 8px; font-size: 0.95em; box-shadow: 0 1px 3px rgba(0,0,0,0.12);',
  duration: 'color: #00CED1; font-weight: 600; font-size: 0.9em; margin-left: 8px;',
  calledFrom: 'color: #9370DB; font-size: 0.85em; font-style: italic; opacity: 0.8; margin-left: 8px;',
  header: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #FFFFFF; font-size: 1.4em; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); box-shadow: 0 4px 6px rgba(0,0,0,0.1);',
  footer: 'background: linear-gradient(135deg, #2d3436 0%, #000000 100%); color: #FFFFFF; font-size: 0.9em; padding: 6px 12px; border-radius: 6px; font-weight: 600; margin-top: 8px;',
  objectKey: 'color: #FFFFFF; font-weight: bold; padding: 6px 14px; border-radius: 6px; margin-right: 12px; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);',
  objectValue: 'font-weight: 600; padding: 4px 10px; border-radius: 4px; margin-right: 10px;',
  objectDescription: 'color: #A0A0A0; font-style: italic; font-size: 0.85em; opacity: 0.8; margin-left: 4px;',
  // Estilos de tipo de valor
  numberValue: 'color: #4FC3F7; background: rgba(79, 195, 247, 0.1); padding: 2px 8px; border-radius: 4px; font-weight: 600; font-family: monospace;',
  stringValue: 'color: #81C784; background: rgba(129, 199, 132, 0.1); padding: 2px 8px; border-radius: 4px; font-weight: 600;',
  booleanTrue: 'color: #4CAF50; background: rgba(76, 175, 80, 0.15); padding: 2px 12px; border-radius: 12px; font-weight: bold; font-size: 0.9em;',
  booleanFalse: 'color: #F44336; background: rgba(244, 67, 54, 0.15); padding: 2px 12px; border-radius: 12px; font-weight: bold; font-size: 0.9em;',
  enumValue: 'color: #E91E63; background: rgba(233, 30, 99, 0.1); padding: 2px 8px; border-radius: 4px; font-weight: 600; font-style: italic;'
};

/**
 * Logger de depuración optimizado para el Efecto de Cristal Líquido.
 * Proporciona un logging específico del flujo de trabajo con soporte TypeScript y estilos de consola.
 * Permite categorizar y visualizar la información de depuración de manera efectiva.
 */
export class GlassLogger {
  private static instance: GlassLogger;
  private isDebugMode: boolean;
  private component: string;
  private performanceMetrics: Map<string, PerformanceMetric> = new Map();

  /**
   * Crea una instancia de GlassLogger.
   * @param {string} [component='LIQUID GLASS'] - El nombre del componente o módulo que utiliza este logger.
   * @param {boolean} [debugMode=false] - Si el modo de depuración está habilitado. Sobrescribe `process.env.NODE_ENV === 'development'`.}
   */
  constructor(component: string = 'LIQUID GLASS', debugMode: boolean = false) {
    this.component = component;
    this.isDebugMode = debugMode || process.env.NODE_ENV === 'development';
  }

  /**
   * Obtiene la instancia singleton de GlassLogger.
   * @param {string} [component] - Opcional: El nombre del componente para la instancia. Solo se usa en la primera creación.
   * @param {boolean} [debugMode] - Opcional: Si el modo de depuración está habilitado. Solo se usa en la primera creación.
   * @returns {GlassLogger} La instancia singleton de GlassLogger.
   */
  static getInstance(component?: string, debugMode?: boolean): GlassLogger {
    if (!GlassLogger.instance) {
      GlassLogger.instance = new GlassLogger(component, debugMode);
    }
    return GlassLogger.instance;
  }

  /**
   * Establece el modo de depuración para esta instancia del logger.
   * @param {boolean} enabled - `true` para habilitar el modo de depuración, `false` para deshabilitarlo.
   */
  setDebugMode(enabled: boolean): void {
    this.isDebugMode = enabled;
  }

  /**
   * Obtiene la ubicación de la llamada (archivo y línea) para el log.
   * @private
   * @param {number} [skipLines=4] - Número de líneas a omitir en el stack trace para encontrar la ubicación relevante.
   * @returns {string} La cadena de ubicación (e.g., `src/path/to/file.ts:lineNumber`).
   */
  private getCalledFrom(skipLines: number = 4): string {
    const stack = new Error().stack;
    if (!stack) return 'unknown';

    const lines = stack.split('\n');
    // Skip the specified number of lines based on call depth
    for (let i = skipLines; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('src/') && !line.includes('debug-log')) {
        // Improved regex to handle query params and extract clean path
        const match = line.match(/\/(src\/[^:?\s]+)(?:\?[^:]*)?:(\d+)/);
        if (match) {
          // Clean the path from any query params
          const cleanPath = match[1].replace(/\?.*$/, '');
          return `${cleanPath}:${match[2]}`;
        }
      }
    }
    return 'unknown';
  }

  /**
   * Método de log privado que formatea y envía el mensaje a la consola.
   * @private
   * @param {LogLevelType} level - El nivel de log (INFO, SUCCESS, WARN, ERROR, DEBUG).
   * @param {string} message - El mensaje principal del log.
   * @param {LogContext} [context] - Contexto adicional para el log.
   */
  private log(level: LogLevelType, message: string, context?: LogContext): void {
    if (!this.isDebugMode) return;

    const prefix = `${this.component}`;
    const operation = context?.operation ? ` [${context.operation}]` : '';
    const duration = context?.duration ? ` (${context.duration}ms)` : '';
    const calledFrom = context?.calledFrom || this.getCalledFrom();

    const style = CONSOLE_STYLES[level];
    const prefixStyle = CONSOLE_STYLES.prefix;
    const baseOperationStyle = CONSOLE_STYLES.operation;
    const operationStyle = context?.operation && OPERATION_STYLES[context.operation] 
      ? baseOperationStyle + OPERATION_STYLES[context.operation]
      : baseOperationStyle + 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #FFFFFF;';
    const durationStyle = CONSOLE_STYLES.duration;
    const calledFromStyle = CONSOLE_STYLES.calledFrom;

    // Añadir emoji basado en el nivel de log
    const levelEmoji = {
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.SUCCESS]: '✅',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.ERROR]: '❌',
      [LogLevel.DEBUG]: '🔍'
    }[level] || '';

    console.log(
      `%c${prefix}%c${operation}%c ${levelEmoji} ${message}%c${duration} %c📍 ${calledFrom}`,
      prefixStyle,
      operationStyle,
      style,
      durationStyle,
      calledFromStyle
    );

    if (context?.metadata) {
      this.logContext(context.metadata, context.operation);
    }
  }

  // Métodos de logging específicos del flujo de trabajo

  /**
   * Registra la construcción del mapa de desplazamiento SVG.
   * @param {SVGConstructionData} data - Datos relevantes para la construcción del SVG.
   */
  logSVGConstruction(data: SVGConstructionData): void {
    const { width, height, radius, border, calculatedBorder, blend, lightness, alpha, blur } = data;
    
    this.log(LogLevel.INFO, 
      `Construyendo mapa de desplazamiento SVG (${width}×${height}px, radio: ${radius}px)`,
      { 
        operation: 'SVG_CONSTRUCTION',
        metadata: { width, height, radius, border, calculatedBorder, blend, lightness, alpha, blur }
      }
    );

    this.log(LogLevel.DEBUG,
      `Cálculo del borde: ${calculatedBorder.toFixed(2)}px (${(border * 100).toFixed(1)}% de la dimensión mínima)`,
      { 
        operation: 'BORDER_CALC',
        metadata: { calculatedBorder, border, minDimension: Math.min(width, height) }
      }
    );
  }

  /**
   * Registra la generación del URI de datos SVG.
   * @param {string} dataUri - El URI de datos SVG generado.
   * @param {string} svgContent - El contenido SVG original.
   */
  logSVGDataURI(dataUri: string, svgContent: string): void {
    this.log(LogLevel.SUCCESS,
      `Mapa de desplazamiento SVG codificado (${dataUri.length} caracteres, ${svgContent.length} bytes)`,
      { 
        operation: 'SVG_ENCODING',
        metadata: { 
          dataUriLength: dataUri.length, 
          svgContentLength: svgContent.length,
          preview: dataUri.substring(0, 50) + '...'
        }
      }
    );
  }

  /**
   * Registra la configuración de GSAP Draggable.
   * @param {GSAPSetupData} data - Datos relevantes para la configuración de GSAP Draggable.
   */
  logGSAPSetup(data: GSAPSetupData): void {
    const { type, bounds, element, draggable } = data;
    
    this.log(LogLevel.INFO,
      `Configurando interacción arrastrable de GSAP (tipo: ${type}, elemento: ${element})`,
      { 
        operation: 'GSAP_SETUP',
        metadata: { type, bounds, element, draggable }
      }
    );
  }

  /**
   * Registra la inicialización exitosa de GSAP Draggable.
   * @param {string} element - El elemento HTML al que se aplicó el arrastre.
   * @param {Record<string, unknown>} config - La configuración utilizada para GSAP Draggable.
   */
  logGSAPSuccess(element: string, config: Record<string, unknown>): void {
    this.log(LogLevel.SUCCESS,
      `GSAP arrastrable listo (elemento: ${element})`,
      { 
        operation: 'GSAP_READY',
        metadata: { element, config }
      }
    );
  }

  /**
   * Registra la aplicación de la configuración del efecto de cristal.
   * @param {ConfigApplicationData} data - Datos relevantes sobre la configuración aplicada.
   */
  logConfigApplication(data: ConfigApplicationData): void {
    const { preset, customProps, mergedConfig } = data;
    
    this.log(LogLevel.INFO,
      `Aplicando configuración (preset: "${preset}", propiedades personalizadas: ${customProps.length})`,
      { 
        operation: 'CONFIG_APPLICATION',
        metadata: { preset, customProps, mergedConfig }
      }
    );
  }

  /**
   * Registra una operación de filtro SVG.
   * @param {string} filterType - El tipo de filtro SVG (e.g., 'displacement-map').
   * @param {Record<string, unknown>} properties - Propiedades relevantes del filtro.
   */
  logFilterOperation(filterType: string, properties: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG,
      `🔍 Operación de filtro SVG: ${filterType}`,
      { 
        operation: 'FILTER_OPERATION',
        metadata: { filterType, properties }
      }
    );
  }

  /**
   * Inicia la medición de rendimiento para una operación.
   * @param {string} operation - El nombre de la operación a medir.
   */
  startPerformanceMetric(operation: string): void {
    if (!this.isDebugMode) return;

    const metric: PerformanceMetric = {
      operation,
      startTime: performance.now(),
      duration: 0,
      endTime: 0
    };
    
    this.performanceMetrics.set(operation, metric);
  }

  /**
   * Finaliza la medición de rendimiento para una operación y registra el resultado.
   * @param {string} operation - El nombre de la operación que finaliza.
   * @returns {number} La duración de la operación en milisegundos.
   */
  endPerformanceMetric(operation: string): number {
    if (!this.isDebugMode) return 0;

    const metric = this.performanceMetrics.get(operation);
    if (!metric) return 0;

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    this.log(LogLevel.DEBUG,
      `⏱️ Rendimiento: ${operation} completado`,
      { 
        operation: 'PERFORMANCE',
        duration: Math.round(metric.duration * 100) / 100,
        metadata: { operation, duration: metric.duration }
      }
    );

    this.performanceMetrics.delete(operation);
    return metric.duration;
  }

  /**
   * Registra un mensaje de información.
   * @param {string} message - El mensaje a registrar.
   * @param {string} [operation] - Opcional: La operación asociada al mensaje.
   */
  info(message: string, operation?: string): void {
    this.log(LogLevel.INFO, message, { operation });
  }

  /**
   * Registra un mensaje de éxito.
   * @param {string} message - El mensaje a registrar.
   * @param {string} [operation] - Opcional: La operación asociada al mensaje.
   */
  success(message: string, operation?: string): void {
    this.log(LogLevel.SUCCESS, message, { operation });
  }

  /**
   * Registra un mensaje de advertencia.
   * @param {string} message - El mensaje a registrar.
   * @param {string} [operation] - Opcional: La operación asociada al mensaje.
   */
  warn(message: string, operation?: string): void {
    this.log(LogLevel.WARN, message, { operation });
  }

  /**
   * Registra un mensaje de error.
   * @param {string} message - El mensaje a registrar.
   * @param {string} [operation] - Opcional: La operación asociada al mensaje.
   */
  error(message: string, operation?: string): void {
    this.log(LogLevel.ERROR, message, { operation });
  }

  /**
   * Registra un mensaje de depuración.
   * @param {string} message - El mensaje a registrar.
   * @param {string} [operation] - Opcional: La operación asociada al mensaje.
   */
  debug(message: string, operation?: string): void {
    this.log(LogLevel.DEBUG, message, { operation });
  }

  /**
   * Registra eventos del ciclo de vida del componente.
   * @param {string} event - El nombre del evento del ciclo de vida (e.g., 'mount', 'unmount').
   * @param {Record<string, unknown>} [data] - Datos adicionales relevantes para el evento.
   */
  logLifecycle(event: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG,
      `🔄 Ciclo de vida del componente: ${event}`,
      { 
        operation: 'LIFECYCLE',
        metadata: data
      }
    );
  }

  /**
   * Registra cambios en la configuración.
   * @param {string} property - El nombre de la propiedad que cambió.
   * @param {unknown} oldValue - El valor anterior de la propiedad.
   * @param {unknown} newValue - El nuevo valor de la propiedad.
   */
  logConfigChange(property: string, oldValue: unknown, newValue: unknown): void {
    this.log(LogLevel.DEBUG,
      `📝 Cambio de configuración: ${property} (${oldValue} → ${newValue})`,
      { 
        operation: 'CONFIG_CHANGE',
        metadata: { property, oldValue, newValue }
      }
    );
  }

  /**
   * Registra un objeto con propiedades estilizadas en la consola.
   * Utiliza `console.groupCollapsed` para una mejor organización.
   * @param {Record<string, unknown>} [object={}] - El objeto a registrar.
   * @param {string} [header='🧪 GLASS EFFECT CONFIGURATION'] - El encabezado del grupo de log.
   * @param {PropertyDescriptions} [descriptions={}] - Descripciones opcionales para cada propiedad del objeto.
   * @param {CustomPropertyStyles} [customPropertyStyles={}] - Estilos CSS personalizados para las claves, valores y descripciones de las propiedades.
   */
  logObject(
    object: Record<string, unknown> = {},
    header: string = '🧪 GLASS EFFECT CONFIGURATION',
    descriptions: PropertyDescriptions = {},
    customPropertyStyles: CustomPropertyStyles = {}
  ): void {
    if (!this.isDebugMode) return;
    if (typeof object !== 'object' || object === null) {
      this.warn('El valor proporcionado no es un objeto válido para logObject');
      return;
    }

    const calledFrom = this.getCalledFrom();
    
    // Encabezado con información de la llamada
    console.groupCollapsed(
      `%c${header} %c📍 ${calledFrom}`,
      CONSOLE_STYLES.header,
      CONSOLE_STYLES.calledFrom
    );

    // Registrar cada propiedad con estilo
    for (const [key, value] of Object.entries(object)) {
      const description = descriptions[key] || '';
      let val: string;
      let valueDisplay: string;
      
      if (typeof value === 'object' && value !== null) {
        val = JSON.stringify(value, null, 2);
        valueDisplay = val;
      } else if (typeof value === 'number') {
        // Formatear números de forma legible
        valueDisplay = Number.isInteger(value) ? value.toString() : value.toFixed(2);
      } else if (typeof value === 'boolean') {
        valueDisplay = value ? 'true' : 'false';
      } else {
        valueDisplay = String(value);
      }

      const keyStyle = customPropertyStyles[key]?.key 
        ? this.objectToStyle(customPropertyStyles[key].key!) 
        : CONSOLE_STYLES.objectKey;
      // Determinar el estilo del valor según el tipo
      let valueStyle: string;
      if (customPropertyStyles[key]?.value) {
        valueStyle = this.objectToStyle(customPropertyStyles[key].value!);
      } else if (typeof value === 'number') {
        valueStyle = CONSOLE_STYLES.numberValue;
      } else if (typeof value === 'boolean') {
        valueStyle = value ? CONSOLE_STYLES.booleanTrue : CONSOLE_STYLES.booleanFalse;
      } else if (typeof value === 'string' && ['R', 'G', 'B', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'].includes(value)) {
        valueStyle = CONSOLE_STYLES.enumValue;
      } else if (typeof value === 'string') {
        valueStyle = CONSOLE_STYLES.stringValue;
      } else {
        valueStyle = CONSOLE_STYLES.objectValue;
      }
      const descriptionStyle = customPropertyStyles[key]?.description 
        ? this.objectToStyle(customPropertyStyles[key].description!) 
        : CONSOLE_STYLES.objectDescription;

      // Construir la cadena de log
      let logString = `%c${key.toUpperCase()}:%c ${valueDisplay}`;
      const styles = [keyStyle, valueStyle];
      
      if (description) {
        logString += ` %c(${description})`;
        styles.push(descriptionStyle);
      }

      console.log(logString, ...styles);
    }

    console.groupEnd();
    console.log('%c--- FIN DE CONFIGURACIÓN ---', CONSOLE_STYLES.footer);
  }

  /**
   * Registra un resumen de la configuración del Efecto de Cristal con categorización visual.
   * @param {Record<string, unknown>} config - El objeto de configuración del efecto de cristal.
   */
  logGlassEffectSummary(config: Record<string, unknown>): void {
    const descriptions: PropertyDescriptions = {
      width: 'Ancho del componente en píxeles',
      height: 'Alto del componente en píxeles',
      radius: 'Radio del borde para esquinas redondeadas',
      frost: 'Intensidad del efecto de escarchado (0-1)',
      blur: 'Cantidad de desenfoque gaussiano en píxeles',
      displace: 'Fuerza del mapa de desplazamiento',
      scale: 'Escala base para el desplazamiento',
      border: 'Porcentaje de grosor del borde',
      alpha: 'Nivel de transparencia (0-1)',
      lightness: 'Porcentaje de luminosidad del fondo',
      x: 'Selector de canal del eje X (R/G/B)',
      y: 'Selector de canal del eje Y (R/G/B)',
      blend: 'Modo de mezcla CSS para el desplazamiento',
      r: 'Aberración cromática del canal rojo',
      g: 'Aberración cromática del canal verde',
      b: 'Aberración cromática del canal azul'
    };

    const customStyles: CustomPropertyStyles = {
      // Dimensiones - Tema naranja
      width: { key: { 'background': 'linear-gradient(135deg, #F97316, #EA580C)' } },
      height: { key: { 'background': 'linear-gradient(135deg, #F97316, #EA580C)' } },
      radius: { key: { 'background': 'linear-gradient(135deg, #10B981, #059669)' } },
      
      // Efectos Visuales - Tema púrpura/azul  
      frost: { key: { 'background': 'linear-gradient(135deg, #8B5CF6, #7C3AED)' } },
      blur: { key: { 'background': 'linear-gradient(135deg, #6366F1, #4F46E5)' } },
      displace: { key: { 'background': 'linear-gradient(135deg, #F59E0B, #D97706)' } },
      scale: { key: { 'background': 'linear-gradient(135deg, #EC4899, #DB2777)' } },
      
      // Apariencia - Tema verde azulado/cian
      border: { key: { 'background': 'linear-gradient(135deg, #14B8A6, #0D9488)' } },
      alpha: { key: { 'background': 'linear-gradient(135deg, #8B5CF6, #7C3AED)' } },
      lightness: { key: { 'background': 'linear-gradient(135deg, #EAB308, #CA8A04)' } },
      
      // Selectores de Canal - Rojo/Azul con insignias
      x: { key: { 'background': 'linear-gradient(135deg, #EF4444, #DC2626)' } },
      y: { key: { 'background': 'linear-gradient(135deg, #3B82F6, #2563EB)' } },
      blend: { key: { 'background': 'linear-gradient(135deg, #A855F7, #9333EA)' } },
      
      // Cromático RGB - Codificado por colores
      r: { key: { 'background': 'linear-gradient(135deg, #EF4444, #B91C1C)' } },
      g: { key: { 'background': 'linear-gradient(135deg, #22C55E, #16A34A)' } },
      b: { key: { 'background': 'linear-gradient(135deg, #3B82F6, #1D4ED8)' } }
    };

    // Crear configuración categorizada para una mejor organización
    const categorizedConfig = {
      '📐 DIMENSIONES': {
        width: config.width,
        height: config.height,
        radius: config.radius,
      },
      '🎨 EFECTOS VISUALES': {
        frost: config.frost,
        blur: config.blur,
        displace: config.displace,
        scale: config.scale,
      },
      '🖼️ APARIENCIA': {
        border: config.border,
        alpha: config.alpha,
        lightness: config.lightness,
      },
      '🎯 CANALES': {
        x: config.x,
        y: config.y,
        blend: config.blend,
      },
      '🌈 ABERRACIÓN CROMÁTICA': {
        r: config.r,
        g: config.g,
        b: config.b,
      }
    };

    // Encabezado del log - usar más líneas de salto ya que se llama desde logGlassEffectSummary
    const calledFrom = this.getCalledFrom(3);
    console.groupCollapsed(
      `%c✨ CONFIGURACIÓN DEL EFECTO DE CRISTAL LÍQUIDO ✨ %c📍 ${calledFrom}`,
      CONSOLE_STYLES.header,
      CONSOLE_STYLES.calledFrom
    );

    // Registrar cada categoría
    Object.entries(categorizedConfig).forEach(([category, props]) => {
      console.group(`%c${category}`, 'color: #FFD700; font-weight: bold; font-size: 1.1em; margin: 8px 0;');
      
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined) return;
        
        const description = descriptions[key] || '';
        let valueDisplay: string;
        
        if (typeof value === 'number') {
          valueDisplay = Number.isInteger(value) ? value.toString() : value.toFixed(2);
        } else if (typeof value === 'boolean') {
          valueDisplay = value ? 'true' : 'false';
        } else {
          valueDisplay = String(value);
        }

        const keyStyle = customStyles[key]?.key 
          ? this.objectToStyle(customStyles[key].key!) 
          : CONSOLE_STYLES.objectKey;
        
        // Determinar el estilo del valor según el tipo
        let valueStyle: string;
        if (typeof value === 'number') {
          valueStyle = CONSOLE_STYLES.numberValue;
        } else if (typeof value === 'boolean') {
          valueStyle = value ? CONSOLE_STYLES.booleanTrue : CONSOLE_STYLES.booleanFalse;
        } else if (typeof value === 'string' && ['R', 'G', 'B'].includes(value)) {
          valueStyle = CONSOLE_STYLES.enumValue;
        } else if (typeof value === 'string' && ['multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'].includes(value)) {
          valueStyle = CONSOLE_STYLES.enumValue;
        } else {
          valueStyle = CONSOLE_STYLES.stringValue;
        }

        const descriptionStyle = CONSOLE_STYLES.objectDescription;

        // Construir la cadena de log
        let logString = `%c${key.toUpperCase()}%c = %c${valueDisplay}`;
        const styles = [keyStyle, 'color: #666;', valueStyle];
        
        if (description) {
          logString += ` %c${description}`;
          styles.push(descriptionStyle);
        }

        console.log(logString, ...styles);
      });
      
      console.groupEnd();
    });

    console.groupEnd();
    console.log('%c--- FIN DE CONFIGURACIÓN ---', CONSOLE_STYLES.footer);
  }

  /**
   * Método auxiliar para convertir un objeto de estilo en una cadena CSS.
   * @private
   * @param {Record<string, string>} styleObj - El objeto de estilo a convertir.
   * @returns {string} La cadena CSS resultante.
   */
  private objectToStyle(styleObj: Record<string, string>): string {
    return Object.entries(styleObj)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ') + ';';
  }

  /**
   * Registra metadatos de contexto con formato estilizado.
   * @private
   * @param {Record<string, unknown>} metadata - Los metadatos a registrar.
   * @param {string} [operation] - Opcional: La operación asociada a los metadatos.
   */
  private logContext(metadata: Record<string, unknown>, operation?: string): void {
    const headerStyle = 'background: linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%); color: #FFFFFF; font-weight: bold; padding: 4px 12px; border-radius: 6px; font-size: 0.95em; margin: 4px 0;';
    
    const operationLabel = operation ? ` desde ${operation}` : '';
    console.groupCollapsed(`%c📊 Datos de Contexto${operationLabel}`, headerStyle);
    
    // Aplanar objetos anidados para una mejor visualización en tabla
    const flattenedData: Record<string, unknown> = {};
    
    Object.entries(metadata).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Si es un objeto, añadir sus propiedades a la tabla
        Object.entries(value as Record<string, unknown>).forEach(([subKey, subValue]) => {
          flattenedData[`${key}.${subKey}`] = subValue;
        });
      } else {
        flattenedData[key] = value;
      }
    });
    
    // Siempre usar tabla para una visualización limpia
    console.table(flattenedData);
    
    console.groupEnd();
  }

  /**
   * Crea un logger especializado para la depuración del efecto de cristal.
   * @param {boolean} [debugMode] - Opcional: Si el modo de depuración está habilitado.
   * @returns {GlassLogger} Una nueva instancia de GlassLogger configurada para el efecto de cristal.
   */
  static createGlassLogger(debugMode?: boolean): GlassLogger {
    return new GlassLogger('EFECTO DE CRISTAL', debugMode);
  }

  /**
   * Crea un logger especializado para la depuración de elementos arrastrables.
   * @param {boolean} [debugMode] - Opcional: Si el modo de depuración está habilitado.
   * @returns {GlassLogger} Una nueva instancia de GlassLogger configurada para elementos arrastrables.
   */
  static createDraggableLogger(debugMode?: boolean): GlassLogger {
    return new GlassLogger('ELEMENTO ARRASTRABLE', debugMode);
  }

  /**
   * Crea un logger especializado para la depuración del motor SVG.
   * @param {boolean} [debugMode] - Opcional: Si el modo de depuración está habilitado.
   * @returns {GlassLogger} Una nueva instancia de GlassLogger configurada para el motor SVG.
   */
  static createSVGLogger(debugMode?: boolean): GlassLogger {
    return new GlassLogger('MOTOR SVG', debugMode);
  }
}

// Exportar instancia singleton y utilidades
export const glassLogger = GlassLogger.createGlassLogger();
export default GlassLogger;