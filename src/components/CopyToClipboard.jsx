import { useState } from 'react';
import { copy } from '../services/icons';;

function CopyToClipboard({text, type='default'}) {

  const [copyMessage, setCopyMessage] = useState(false);

  function copyText() {
      setCopyMessage(true);
      const copyContent = async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
      copyContent();
      setTimeout(() => {
        setCopyMessage(false);
      }, 500);
  }

  return (
      <div className={`copyToClipboard copyToClipboard--${type}`}>
        <button className="btn" onClick={copyText}><img src={copy} className="svg-link svg-link--primary-dark"></img></button>
        {copyMessage && <p className="message">copied!</p>}
      </div>
  );
}

export default CopyToClipboard