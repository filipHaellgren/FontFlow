import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/FontDetail.css'; // Importing regular CSS file

const FontDetail = ({ fonts }) => {
  const { family } = useParams(); // Get the family name from the URL
  const [selectedFont, setSelectedFont] = useState(null);
  const [visibleLink, setVisibleLink] = useState(null); // State to control which variant's link is visible

  useEffect(() => {
    const font = fonts.find((font) => font.family === family);
    if (font) {
      setSelectedFont(font);

      // Load the font dynamically, same as in FontCard
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [family, fonts]);

  const getFontWeight = (variant) => {
    const weight = variant.replace('italic', ''); // Remove 'italic' from the variant string
    return weight === '' ? 400 : parseInt(weight); // Default weight is 400 if no weight is specified
  };

  const isItalic = (variant) => variant.includes('italic');

  const copyToClipboard = (variant) => {
    const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:${variant}&display=swap" rel="stylesheet">`;

    navigator.clipboard.writeText(fontLink).then(() => {
      alert('Font link copied to clipboard!');
    });
  };

  const toggleLinkVisibility = (variant) => {
    if (visibleLink === variant) {
      setVisibleLink(null); // Hide the link box if it's already visible
    } else {
      setVisibleLink(variant); // Show the link box for the clicked variant
    }
  };

  if (!selectedFont) {
    return <div>Font not found.</div>;
  }

  return (
    <div className="container">
      {/* Styles Section */}
     
      <section className="specimen-section" id="styles">
        {/* Title and Version */}
        <div className="titleversion">
          <h1 className="fontTitle">{selectedFont.family}</h1>
          <p className="fontVersion">{selectedFont.version}</p>
        </div>

        {/* Preview of how the font will look in an h2 element */}
        <h2
          id="preview-text"
          style={{
            fontFamily: selectedFont.family, // Applying the selected font here
            fontWeight: 400,
          }}
        >
          This is a Preview
        </h2>

        <h2 className="title">Styles</h2>
        <div className="gf-specimen-variants-preview">
          <ol className="variants-list">
            {selectedFont.variants.map((variant) => (
              <li key={variant} className="variant-item">
                <div className="variant-content-buttons">
                  {/* Variant label (e.g., 100, 200) - should use default system font */}
                  <div className="variant-label">
                    <p>
                      <strong>{variant}</strong>
                    </p>
                  </div>

                  {/* Preview text in the custom font */}
                  <div
                    className="variant-content"
                    style={{
                      fontFamily: selectedFont.family, // Applying the selected font here for the content
                      fontWeight: getFontWeight(variant),
                      fontStyle: isItalic(variant) ? 'italic' : 'normal',
                    }}
                  >
                    <p>The quick brown fox jumps over the lazy dog.</p>
                  </div>

                  <div className="variant-buttons">
                    <button
                      className="custom-button"
                      onClick={() => toggleLinkVisibility(variant)}
                    >
                      {visibleLink === variant ? 'Hide Font Link' : 'Show Font Link'}
                    </button>

                    <a href={selectedFont.files[variant]} download>
                      <button className="custom-button">Download Font</button>
                    </a>
                  </div>
                </div>

                <div className={`snippet-box ${visibleLink === variant ? 'active' : ''}`}>
               
                  <pre>
                    <code>
                      &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
                      <br />
                      &lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
                      <br />
                      &lt;link
                      href={`https://fonts.googleapis.com/css2?family=${family.replace(
                        / /g,
                        '+'
                      )}:${variant}&display=swap`}
                      rel="stylesheet"
                      &gt;
                    </code>
                  </pre>
                  <button onClick={() => copyToClipboard(variant)} className="custom-button">
                    Copy to Clipboard
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default FontDetail;
