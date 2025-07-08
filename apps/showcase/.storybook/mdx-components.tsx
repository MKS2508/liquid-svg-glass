import React from 'react';
import { CodeBlock, InlineCode } from './syntax-highlighter';

/**
 * Custom MDX components for better theming
 * These override default MDX components with our theme styling
 */

const CustomCode: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  // If it has a language class, it's likely a code block
  if (className && className.startsWith('language-')) {
    const language = className.replace('language-', '');
    return (
      <CodeBlock language={language}>
        {String(children).replace(/\n$/, '')}
      </CodeBlock>
    );
  }
  
  // Otherwise, it's inline code
  return <InlineCode>{children}</InlineCode>;
};

const CustomPre: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  // Check if the child is a code element with language
  const child = React.Children.only(children) as React.ReactElement;
  if (child && child.props && child.props.className) {
    const language = child.props.className.replace('language-', '');
    return (
      <CodeBlock language={language} showLineNumbers={true}>
        {String(child.props.children).replace(/\n$/, '')}
      </CodeBlock>
    );
  }
  
  // Fallback to default pre styling
  return (
    <pre
      className={className}
      style={{
        backgroundColor: 'rgba(179, 146, 240, 0.1)',
        border: '1px solid rgba(179, 146, 240, 0.2)',
        borderRadius: '6px',
        padding: '1rem',
        overflow: 'auto',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        color: '#f8f9fa',
        fontSize: '0.9em',
        lineHeight: '1.5',
      }}
    >
      {children}
    </pre>
  );
};

const CustomHeading1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1
    style={{
      color: '#F87683',
      fontWeight: 600,
      marginBottom: '1rem',
      fontSize: '2.5rem',
      borderBottom: '2px solid rgba(248, 118, 131, 0.3)',
      paddingBottom: '0.5rem',
    }}
  >
    {children}
  </h1>
);

const CustomHeading2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2
    style={{
      color: '#F87683',
      fontWeight: 600,
      marginBottom: '0.875rem',
      marginTop: '2rem',
      fontSize: '2rem',
    }}
  >
    {children}
  </h2>
);

const CustomHeading3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      color: '#F87683',
      fontWeight: 600,
      marginBottom: '0.75rem',
      marginTop: '1.5rem',
      fontSize: '1.5rem',
    }}
  >
    {children}
  </h3>
);

const CustomParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      color: '#f8f9fa',
      lineHeight: 1.6,
      marginBottom: '1rem',
    }}
  >
    {children}
  </p>
);

const CustomLink: React.FC<{ 
  children: React.ReactNode; 
  href?: string;
  target?: string;
}> = ({ children, href, target }) => (
  <a
    href={href}
    target={target}
    style={{
      color: '#B392F0',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(179, 146, 240, 0.3)',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = '#F87683';
      e.currentTarget.style.borderBottomColor = '#F87683';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '#B392F0';
      e.currentTarget.style.borderBottomColor = 'rgba(179, 146, 240, 0.3)';
    }}
  >
    {children}
  </a>
);

const CustomTable: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'rgba(179, 146, 240, 0.02)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {children}
    </table>
  </div>
);

const CustomTh: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th
    style={{
      backgroundColor: 'rgba(179, 146, 240, 0.05)',
      color: '#F87683',
      fontWeight: 600,
      padding: '0.75rem',
      borderBottom: '2px solid rgba(179, 146, 240, 0.2)',
      textAlign: 'left',
    }}
  >
    {children}
  </th>
);

const CustomTd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td
    style={{
      color: '#f8f9fa',
      padding: '0.75rem',
      borderBottom: '1px solid rgba(179, 146, 240, 0.1)',
    }}
  >
    {children}
  </td>
);

const CustomBlockquote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote
    style={{
      backgroundColor: 'rgba(179, 146, 240, 0.05)',
      borderLeft: '4px solid #B392F0',
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '0 6px 6px 0',
      fontStyle: 'italic',
    }}
  >
    {children}
  </blockquote>
);

const CustomUl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul
    style={{
      color: '#f8f9fa',
      paddingLeft: '1.5rem',
      marginBottom: '1rem',
    }}
  >
    {children}
  </ul>
);

const CustomLi: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li
    style={{
      color: '#f8f9fa',
      lineHeight: 1.6,
      marginBottom: '0.5rem',
    }}
  >
    {children}
  </li>
);

// Export the components map
export const mdxComponents = {
  code: CustomCode,
  pre: CustomPre,
  h1: CustomHeading1,
  h2: CustomHeading2,
  h3: CustomHeading3,
  p: CustomParagraph,
  a: CustomLink,
  table: CustomTable,
  th: CustomTh,
  td: CustomTd,
  blockquote: CustomBlockquote,
  ul: CustomUl,
  li: CustomLi,
};