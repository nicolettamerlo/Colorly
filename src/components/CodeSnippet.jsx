import { useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemeContext } from '../AppLayout';
import CopyToClipboard from './CopyToClipboard';

function CodeSnippet({ codeString, language = "css", showLineNumbers = true, showInlineLineNumbers = true }) {
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext?.theme ?? 'light'; // Fallback a 'light'

  return (
    <div className='codeSnippet'>
      <CopyToClipboard text={codeString} type='absolute' />
      <SyntaxHighlighter
        language={language}
        style={currentTheme === 'light' ? docco : a11yDark}
        showLineNumbers={showLineNumbers}
        showInlineLineNumbers={showInlineLineNumbers}
        wrapLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeSnippet;
