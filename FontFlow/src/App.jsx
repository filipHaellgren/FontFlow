import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popularity'); // Default sort option

  // Function to fetch fonts with the selected sorting option
  const fetchFonts = async (sort) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA1AeGFpEZaoa_j5rQQkZmLP2yYPsdtrmc&sort=${sort}`
      );
      setFonts(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch fonts when the component mounts or when the sortOption changes
    fetchFonts(sortOption);
  }, [sortOption]);

  const addFontLinkToHead = (fontFamily) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (loading) {
    return <div>Loading fonts...</div>;
  }

  return (
    <div>
      <h1>Google Fonts Showcase</h1>

      {/* Dropdown to select sorting option */}
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="popularity">Popularity</option>
          <option value="alpha">Alphabetical</option>
          <option value="date">Date Added</option>
          <option value="style">Number of Styles</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* Display the fonts */}
      <div>
        {fonts.slice(0, 50).map((font) => {
          addFontLinkToHead(font.family);
          return (
            <div key={font.family} style={{ fontFamily: font.family, marginBottom: '20px' }}>
              <h2>{font.family}</h2>
              <p>The quick brown fox jumps over the lazy dog. (Sample text)</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
