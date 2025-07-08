import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

/**
 * Custom dark theme for syntax highlighting
 * Based on our theme colors for consistency
 */
export const customDarkTheme = {
  'code[class*="language-"]': {
    color: '#E8BBE8',
    background: 'none',
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    fontSize: '0.9em',
    lineHeight: '1.5',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: '4',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#E8BBE8',
    background: 'rgba(179, 146, 240, 0.1)',
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    fontSize: '0.9em',
    lineHeight: '1.5',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: '4',
    hyphens: 'none',
    padding: '1rem',
    margin: '0.5rem 0',
    overflow: 'auto',
    borderRadius: '6px',
    border: '1px solid rgba(179, 146, 240, 0.2)',
  },
  ':not(pre) > code[class*="language-"]': {
    background: 'rgba(179, 146, 240, 0.15)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid rgba(179, 146, 240, 0.2)',
  },
  'comment': {
    color: '#7C6F8A',
    fontStyle: 'italic',
  },
  'prolog': {
    color: '#6A9955',
  },
  'doctype': {
    color: '#6A9955',
  },
  'cdata': {
    color: '#6A9955',
  },
  'punctuation': {
    color: '#D4D4D4',
  },
  '.namespace': {
    opacity: '0.7',
  },
  'property': {
    color: '#E8BBE8',
  },
  'tag': {
    color: '#E06C75',
  },
  'constant': {
    color: '#D19A66',
  },
  'symbol': {
    color: '#F87683',
  },
  'deleted': {
    color: '#F87683',
  },
  'boolean': {
    color: '#FF6B9D',
  },
  'number': {
    color: '#FF8C94',
  },
  'selector': {
    color: '#B392F0',
  },
  'attr-name': {
    color: '#D19A66',
  },
  'string': {
    color: '#F87683',
  },
  'char': {
    color: '#F87683',
  },
  'builtin': {
    color: '#56B6C2',
  },
  'inserted': {
    color: '#98C379',
  },
  'operator': {
    color: '#FF6B9D',
  },
  'entity': {
    color: '#B392F0',
    cursor: 'help',
  },
  'url': {
    color: '#B392F0',
  },
  '.language-css .token.string': {
    color: '#F87683',
  },
  '.style .token.string': {
    color: '#F87683',
  },
  'atrule': {
    color: '#B392F0',
  },
  'attr-value': {
    color: '#F87683',
  },
  'function': {
    color: '#C9A9FF',
    fontWeight: '500',
  },
  'class-name': {
    color: '#B392F0',
    fontWeight: '500',
  },
  'keyword': {
    color: '#FF6B9D',
    fontWeight: '600',
  },
  'regex': {
    color: '#F87683',
  },
  'important': {
    color: '#F87683',
    fontWeight: 'bold',
  },
  'variable': {
    color: '#E8BBE8',
  },
  // Tokens específicos para TypeScript
  'parameter': {
    color: '#E8BBE8',
  },
  'type-annotation': {
    color: '#B392F0',
  },
  'interface-name': {
    color: '#B392F0',
  },
  'type': {
    color: '#B392F0',
    fontWeight: '500',
  },
  'maybe-class-name': {
    color: '#B392F0',
  },
  'literal-property': {
    color: '#E06C75',
  },
  // Tokens adicionales para mejor syntax highlighting
  'template-string': {
    color: '#98C379',
  },
  'interpolation': {
    color: '#E5C07B',
  },
  'interpolation-punctuation': {
    color: '#56B6C2',
  },
  'method': {
    color: '#61AFEF',
  },
  'property-access': {
    color: '#56B6C2',
  },
  'spread': {
    color: '#56B6C2',
  },
  'generic': {
    color: '#B392F0',
  },
  'annotation': {
    color: '#C678DD',
  },
  'decorator': {
    color: '#C678DD',
  },
  'arrow': {
    color: '#56B6C2',
  },
  'this': {
    color: '#E06C75',
    fontStyle: 'italic',
  },
  'console': {
    color: '#61AFEF',
  },
  'dom': {
    color: '#61AFEF',
  },
  // Tokens adicionales para mejor parsing de objetos TypeScript
  'object-property': {
    color: '#E8BBE8',
  },
  'key': {
    color: '#E8BBE8',
  },
  'object-key': {
    color: '#E8BBE8',
  },
  'shorthand-property': {
    color: '#E8BBE8',
  },
  'property-name': {
    color: '#E8BBE8',
  },
  'assignment': {
    color: '#D4D4D4',
  },
  'colon': {
    color: '#D4D4D4',
  },
  'comma': {
    color: '#D4D4D4',
  },
  'brace': {
    color: '#D4D4D4',
  },
  'bracket': {
    color: '#D4D4D4',
  },
  'paren': {
    color: '#D4D4D4',
  },
  // Fallbacks para tokens no reconocidos
  'token': {
    color: '#E8BBE8',
  },
  'identifier': {
    color: '#E8BBE8',
  },
  'name': {
    color: '#E8BBE8',
  },
  'literal': {
    color: '#E8BBE8',
  },
  'plain': {
    color: '#E8BBE8',
  },
};

/**
 * Enhanced Code Block component with professional styling
 */
export const CodeBlock: React.FC<{
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  highlightLines?: number[];
}> = ({ 
  children, 
  language = 'typescript', 
  showLineNumbers = true,
  title,
  highlightLines = []
}) => {
  return (
    <div style={{ 
      margin: '1rem 0',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(179, 146, 240, 0.2)',
      background: 'rgba(179, 146, 240, 0.05)',
    }}>
      {title && (
        <div style={{
          background: 'rgba(179, 146, 240, 0.1)',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid rgba(179, 146, 240, 0.2)',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#F87683',
          fontFamily: '"Inter", sans-serif',
        }}>
          {title}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={customDarkTheme}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          background: 'transparent',
          border: 'none',
          fontSize: '0.9em',
          lineHeight: '1.6',
          padding: '1.2rem',
        }}
        lineNumberStyle={{
          color: 'rgba(248, 249, 250, 0.4)',
          fontSize: '0.8em',
          marginRight: '1rem',
          minWidth: '2rem',
          textAlign: 'right',
        }}
        wrapLines={true}
        wrapLongLines={true}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
          }
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

/**
 * Inline Code component for better integration
 */
export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <code style={{
      backgroundColor: 'rgba(179, 146, 240, 0.15)',
      color: '#B392F0',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      border: '1px solid rgba(179, 146, 240, 0.2)',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '0.9em',
      fontWeight: '500',
    }}>
      {children}
    </code>
  );
};