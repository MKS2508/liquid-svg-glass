// beauty-log.js

const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

function styleToString(styleObj) {
    return Object.entries(styleObj)
        .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
        .join(' ');
}

const STYLE_VARS = {
    borderRadius: '6px',
    shadowLight: '0 0 6px rgba(0,255,255,0.4)',
    fontMono: `'Fira Code', 'Consolas', monospace`
};

const THEMES = {
    dark: {
        header: {
            background: 'linear-gradient(45deg, #330000, #000000)',
            color: '#FFFFFF',
            fontSize: '1.5em',
            padding: '8px 15px',
            borderRadius: '5px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        },
        footer: {
            background: 'linear-gradient(45deg, #000000, #330000)',
            color: '#FFFFFF',
            fontSize: '1em',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bold'
        },
        prefix: {
            background: 'linear-gradient(90deg, #007bff, #00c0ff)', // Blue gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '5px 10px',
            borderRadius: '8px',
            marginRight: '10px',
            fontSize: '1.1em',
            textShadow: '0 0 3px rgba(0,0,0,0.4)'
        },
        key: {
            background: 'linear-gradient(to right, #440000, #660000)',
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '3px 8px',
            borderRadius: '3px',
            marginRight: '5px'
        },
        value: {
            background: 'linear-gradient(to right, #000000, #8B0000)',
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '3px 8px',
            borderRadius: '3px',
            marginRight: '5px'
        },
        description: {
            background: 'linear-gradient(to right, #1a1a1a, #333333)',
            color: '#CCCCCC',
            fontStyle: 'italic',
            padding: '3px 8px',
            borderRadius: '3px'
        },
        info: { background: '#2c3e50', color: '#ADD8E6', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }, // Dark Blue-Grey background, Light Blue text
        success: { background: '#27ae60', color: '#FFFFFF', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }, // Emerald Green background, White text
        warning: { background: '#f39c12', color: '#FFFFFF', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }, // Orange background, White text
        error: { background: '#c0392b', color: '#FFFFFF', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }, // Dark Red background, White text

        // New styles for granular highlighting
        messageText: { color: '#E0E0E0' }, // General message text
        variableName: { color: '#00FFFF', fontWeight: 'bold' }, // Cyan for variable names
        variableValue: { color: '#FFD700', fontWeight: 'bold' }, // Gold for variable values
        undefinedValue: { background: '#8B0000', color: '#FFFFFF', fontWeight: 'bold', padding: '2px 5px', borderRadius: '3px' }, // Dark Red background for undefined
        stringValue: { color: '#90EE90' }, // Light Green for strings
        numberValue: { color: '#FF6347' }, // Tomato for numbers
        svgFilterElement: { color: '#FF4500', fontWeight: 'bold' }, // OrangeRed for SVG filter elements
        successPhrase: { color: '#32CD32', fontWeight: 'bold' }, // LimeGreen for success messages
        infoPhrase: { color: '#87CEEB' }, // SkyBlue for informational messages
        highlightValue: { color: '#FFD700', fontWeight: 'bold' }, // Gold for highlighted values like X:R, Y:B, gradient-dark
        svgElementName: { color: '#8A2BE2', fontWeight: 'bold' }, // BlueViolet for SVG element names (e.g., feDisplacementMap)
        feGaussianBlurBadge: {
            background: 'linear-gradient(90deg, #8A2BE2, #FF69B4)', // BlueViolet to HotPink gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        feImageBadge: {
            background: 'linear-gradient(90deg, #FFD700, #FFA500)', // Gold to Orange gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        feDisplacementMapBadge: {
            background: 'linear-gradient(90deg, #008080, #00CED1)', // Teal to DarkTurquoise gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        redChannelBadge: {
            background: 'linear-gradient(90deg, #FF0000, #FF6347)', // Red to Tomato gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        greenChannelBadge: {
            background: 'linear-gradient(90deg, #008000, #32CD32)', // Green to LimeGreen gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        blueChannelBadge: {
            background: 'linear-gradient(90deg, #0000FF, #1E90FF)', // Blue to DodgerBlue gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        channelName: { color: '#00CED1', fontWeight: 'bold' }, // DarkTurquoise for other channel names (e.g., alpha, channels)
        channelsBadge: {
            background: 'linear-gradient(90deg, #800080, #BA55D3)', // Purple to MediumOrchid gradient
            color: '#FFFFFF',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: STYLE_VARS.borderRadius,
            marginRight: '8px',
            fontSize: '1.1em',
            textShadow: '0 0 2px rgba(0,0,0,0.25)'
        },
        channelSelectorValue: { color: '#FFD700', fontWeight: 'bold', background: '#333333', padding: '2px 5px', borderRadius: '3px' }, // Gold for X:R, Y:B with a dark background
        keywordPhrase: { color: '#FF8C00', fontWeight: 'bold' } // DarkOrange for general keywords like "href attribute set"
    },
    light: {/* tu definición aquí */},
    neon: {/* tu definición aquí */}
};

let currentTheme = THEMES.dark;

export class BeautyLog {
    static setTheme(themeName = 'dark') {
        currentTheme = THEMES[themeName] || THEMES.dark;
    }

    static logObject(object = {}, header = '🧪 BEAUTY LOG', prefix = '', descriptions = {}, customPropertyStyles = {}) {
        if (typeof object !== 'object' || object === null) {
            this._warnInvalidObject();
            return;
        }

        console.groupCollapsed(`%c${header}`, styleToString(currentTheme.header));

        for (const [key, value] of Object.entries(object)) {
            const prettyKey = prefix ? `${prefix}.${key}` : key;
            const description = descriptions[key] || 'No description available';

            const val =
                typeof value === 'object' && value !== null
                    ? JSON.stringify(value, null, 2)
                    : String(value);

            // Determine styles for key, value, and description
            const keyStyle = styleToString(customPropertyStyles[key]?.key || currentTheme.key);
            const valueStyle = styleToString(customPropertyStyles[key]?.value || currentTheme.value);
            const descriptionStyle = styleToString(customPropertyStyles[key]?.description || currentTheme.description);

            console.log(
                `%c${prettyKey.toUpperCase()}:%c ${val} %c(${description})`,
                keyStyle,
                valueStyle,
                descriptionStyle
            );
        }

        console.groupEnd();
        console.log('%c--- LOG END ---', styleToString(currentTheme.footer));
    }

    static info(message, prefix = '') {
        this._printWithPrefix(message, currentTheme.info, prefix);
    }

    static success(message, prefix = '') {
        this._printWithPrefix(message, currentTheme.success, prefix);
    }

    static warn(message, prefix = '') {
        this._printWithPrefix(message, currentTheme.warning, prefix);
    }

    static error(message, prefix = '') {
        console.error(`%c${message}`, styleToString(currentTheme.error));
    }

    static _printWithPrefix(message, styleObj, prefix = '') {
        const style = styleToString(styleObj);
        let logArgs = [];
        let logString = '';

        if (prefix) {
            logString += `%c[${prefix}] `;
            logArgs.push(styleToString(currentTheme.prefix));
        }

        // Regex to find specific keywords, CSS variables, key: value pairs, numbers, strings, and 'undefined'
        const parts = message.split(/(feGaussianBlur)|(feImage)|(feDisplacementMap)|(redchannel|greenchannel|bluechannel|alpha|channels)|(--[a-zA-Z0-9-]+)|([a-zA-Z_][a-zA-Z0-9_]*:)|(\b\d+(\.\d+)?\b)|('[^']*'|"[^"]*")|(\bundefined\b)|([XY]:[RGB])|(href attribute set|scale set to|stdDeviation set to|Background preset set to|CSS variables set|Effect configurations applied successfully|DOM fully loaded and parsed|Applying effect configurations|Starting SVG construction|Calculated border|SVG element found and ready for serialization|Generated data URI|buildDisplacementImage: SVG construction completed successfully|Initialised for|Effect element opacity set to|Background toggle button event listener added)/g);

        parts.forEach(part => {
            if (!part) return;

            if (part === 'feGaussianBlur') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.feGaussianBlurBadge));
            } else if (part === 'feImage') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.feImageBadge));
            } else if (part === 'feDisplacementMap') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.feDisplacementMapBadge));
            } else if (part === 'redchannel') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.redChannelBadge));
            } else if (part === 'greenchannel') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.greenChannelBadge));
            } else if (part === 'bluechannel') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.blueChannelBadge));
            } else if (part === 'channels') { // Specific badge for 'channels'
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.channelsBadge));
            } else if (part === 'alpha') { // Other channel names
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.channelName));
            } else if (part.match(/[XY]:[RGB]/)) { // Channel selector values like X:R, Y:B
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.channelSelectorValue));
            } else if (part.startsWith('fe') && (part.includes('Map') || part.includes('Filter') || part.includes('Blend'))) { // Other SVG filter elements
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.svgElementName));
            } else if (['href attribute set', 'scale set to', 'stdDeviation set to', 'Background preset set to', 'CSS variables set', 'Effect configurations applied successfully', 'DOM fully loaded and parsed', 'Applying effect configurations', 'Starting SVG construction', 'Calculated border', 'SVG element found and ready for serialization', 'Generated data URI', 'buildDisplacementImage: SVG construction completed successfully', 'Initialised for', 'Effect element opacity set to', 'Background toggle button event listener added'].includes(part)) { // Keyword phrases
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.keywordPhrase));
            } else if (part.startsWith('--')) { // CSS variable name
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.variableName));
            } else if (part.endsWith(':') && !part.includes(' ')) { // Key part of key: value (simple keys)
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.variableName));
            } else if (!isNaN(parseFloat(part)) && isFinite(part)) { // Number value
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.numberValue));
            } else if ((part.startsWith('`') && part.endsWith('`')) || (part.startsWith('"') && part.endsWith('"'))) { // String value
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.stringValue));
            } else if (part === 'undefined') {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.undefinedValue));
            } else {
                logString += `%c${part}`;
                logArgs.push(styleToString(currentTheme.messageText));
            }
        });

        console.log(logString, ...logArgs);
    }

    static _warnInvalidObject() {
        console.warn('%c[BeautyLog] Passed value is not a valid object.', styleToString(currentTheme.warning));
    }

    static _printHeader(header) {
        console.groupCollapsed(`%c${header}`, styleToString(currentTheme.header));
    }

    static _printFooter() {
        console.groupEnd();
        console.log('%c--- LOG END ---', styleToString(currentTheme.footer));
    }

    static _printCollapsedObject(obj, prefix, descriptions) {
        for (const [key, value] of Object.entries(obj)) {
            const val = this._formatValue(value);
            const desc = this._formatDescription(descriptions[key]);
            this._printLogEntry(prefix, key, val, desc);
        }
    }

    static _formatValue(value) {
        return typeof value === 'object' && value !== null
            ? JSON.stringify(value, null, 2)
            : String(value);
    }

    static _formatDescription(description) {
        return description || 'No description available';
    }

    static _printLogEntry(prefix, key, value, description) {
        const prefixStr = prefix ? `%c[${prefix}]` : '';
        const prefixStyle = prefix ? styleToString(currentTheme.prefix) : '';

        // Determine styles for key, value, and description
        const keyStyle = styleToString(currentTheme.key);
        const valueStyle = styleToString(currentTheme.value);
        const descriptionStyle = styleToString(currentTheme.description);

        console.log(
            `${prefixStr}%c${key.toUpperCase()}:%c ${value} %c(${description})`,
            prefixStyle,
            keyStyle,
            valueStyle,
            descriptionStyle
        );
    }
}
