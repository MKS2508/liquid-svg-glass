import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { gsap } from 'gsap';

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
    hyphens: 'none' as const,
    textAlign: 'left' as const,
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
    hyphens: 'none' as const,
    padding: '1rem',
    margin: '0.5rem 0',
    overflow: 'auto',
    borderRadius: '6px',
    border: '1px solid rgba(179, 146, 240, 0.2)',
    textAlign: 'left' as const,
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
  title
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
        style={vscDarkPlus}
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

/**
 * MacOS Window Controls Component
 */
const MacOSWindowControls: React.FC<{ title?: string }> = ({ title }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const controlSize = isMobile ? '10px' : '12px';
  const padding = isMobile ? '8px 12px' : '12px 16px';
  const fontSize = isMobile ? '0.8rem' : '0.875rem';
  const gap = isMobile ? '6px' : '8px';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: padding,
      background: 'rgba(179, 146, 240, 0.1)',
      borderBottom: '1px solid rgba(179, 146, 240, 0.2)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: gap,
        fontSize: fontSize,
        color: '#E8BBE8',
        fontWeight: '500',
      }}>
        <span>📝</span>
        <span>{title || 'tsx'}</span>
      </div>
      <div style={{
        display: 'flex',
        gap: gap,
      }}>
        <span style={{
          width: controlSize,
          height: controlSize,
          borderRadius: '50%',
          backgroundColor: '#ff5f56',
          display: 'block',
        }}></span>
        <span style={{
          width: controlSize,
          height: controlSize,
          borderRadius: '50%',
          backgroundColor: '#ffbd2e',
          display: 'block',
        }}></span>
        <span style={{
          width: controlSize,
          height: controlSize,
          borderRadius: '50%',
          backgroundColor: '#27ca3f',
          display: 'block',
        }}></span>
      </div>
    </div>
  );
};

/**
 * Cursor styles for typing animation
 */
const cursorStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  .typing-cursor {
    color: #B392F0;
    animation: blink 1s infinite;
    font-weight: bold;
  }
  
  /* Responsive styles for TypingCodeBlock */
  .typing-code-block-container {
    background: rgba(0, 0, 0, 0.5);
    background-color: rgba(17, 17, 23, 0.6);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(179, 146, 240, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    margin: 1rem 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .typing-code-block-container pre {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(179, 146, 240, 0.3) transparent;
  }
  
  .typing-code-block-container pre::-webkit-scrollbar {
    height: 6px;
  }
  
  .typing-code-block-container pre::-webkit-scrollbar-track {
    background: rgba(179, 146, 240, 0.1);
  }
  
  .typing-code-block-container pre::-webkit-scrollbar-thumb {
    background: rgba(179, 146, 240, 0.3);
    border-radius: 3px;
  }
  
  @media (min-width: 768px) {
    .typing-code-block-container {
      max-width: 600px;
      margin: 1rem auto;
    }
  }
  
  @media (max-width: 768px) {
    .typing-code-block-container {
      margin: 0.75rem 0;
      border-radius: 8px;
    }
  }
  
  @media (max-width: 480px) {
    .typing-code-block-container {
      margin: 0.5rem 0;
      border-radius: 6px;
    }
  }
`;

/**
 * Enhanced Typing Code Block with syntax highlighting and macOS styling
 */
export const TypingCodeBlock: React.FC<{
  code: string;
  language?: string;
  enableTypingAnimation?: boolean;
  typingSpeed?: number;
  showMacOSControls?: boolean;
  windowTitle?: string;
  showLineNumbers?: boolean;
  minWidth?: string;
  minHeight?: string;
}> = ({ 
  code, 
  language = 'tsx', 
  enableTypingAnimation = true,
  typingSpeed = 2,
  showMacOSControls = true,
  windowTitle,
  showLineNumbers = false,
  minHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? '120px' : '210px'
}) => {
  const codeRef = useRef<HTMLDivElement>(null);
  const [displayedCode, setDisplayedCode] = useState(enableTypingAnimation ? '' : code);
  const [showCursor, setShowCursor] = useState(enableTypingAnimation);
  
  useEffect(() => {
    if (!enableTypingAnimation || !codeRef.current) {
      setDisplayedCode(code);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start typing animation
          gsap.to({}, {
            duration: typingSpeed,
            ease: "none",
            onUpdate: function() {
              const progress = this.progress();
              const currentLength = Math.floor(progress * code.length);
              setDisplayedCode(code.slice(0, currentLength));
            },
            onComplete: () => {
              setShowCursor(false);
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(codeRef.current);
    
    return () => observer.disconnect();
  }, [code, enableTypingAnimation, typingSpeed]);
  
  return (
    <>
      <style>{cursorStyles}</style>
      <div className="typing-code-block-container">
        {showMacOSControls && (
          <MacOSWindowControls title={windowTitle || language} />
        )}
        <div ref={codeRef} style={{ 
          minHeight: minHeight, 
          position: 'relative',
          width: '100%',
          overflowX: 'hidden'
        }}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              background: 'transparent',
              border: 'none',
              fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '0.75em' : '0.9em',
              lineHeight: '1.6',
              padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '0.75rem' : '1.2rem',
              textAlign: 'left' as const,
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
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
            {displayedCode}
          </SyntaxHighlighter>
          {showCursor && enableTypingAnimation && (
            <span className="typing-cursor" style={{ position: 'absolute' }}>|</span>
          )}
        </div>
      </div>
    </>
  );
};

export default CodeBlock;