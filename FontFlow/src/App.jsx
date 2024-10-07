import React, { useState } from 'react';
import FontAPI from './FontApi'; // Import FontAPI component
import FontCard from './FontCard'; // Import FontCard component
import styles from './css/cardGrid.module.css'; // Import the grid styles
import FontDetail from './FontDetail'; // Import the FontDetail component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimatedHeader from './AnimatedHeader'; // Import the new AnimatedHeader component
import './css/App.css';

function App() {
  const [fonts, setFonts] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [showMainContent, setShowMainContent] = useState(false); // New state for controlling the landing page
  const [fadeOut, setFadeOut] = useState(false); // State to handle the fade-out effect

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to handle entering the site
  const handleEnterSite = () => {
    setFadeOut(true); // Start fade-out
    setTimeout(() => {
      setShowMainContent(true); // After fade-out, show main content
    }, 1000); // Delay to match the fade-out duration
  };

  return (
    <Router>
      <div>
        {/* If main content is not shown, display the animated header */}
        {!showMainContent ? (
          <div className={`landing-page ${fadeOut ? 'fade-out' : ''}`}>
            <AnimatedHeader />
            <button className="enter-button" onClick={handleEnterSite}>
              Enter Site
            </button>
          </div>
        ) : (
          <div className="main-content fade-in">
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

            {/* Define Routes */}
            <Routes>
              {/* Default route showing the font grid */}
              <Route
                path="/"
                element={
                  <>
                    <FontAPI sortOption={sortOption} setFonts={setFonts} />
                    <div className={styles.fontGrid}>
                      {fonts.length > 0 ? (
                        fonts.slice(0, 50).map((font) => (
                          <FontCard key={font.family} family={font.family} />
                        ))
                      ) : (
                        <p>No fonts to display</p>
                      )}
                    </div>
                  </>
                }
              />

              {/* Route to display the font details page */}
              <Route path="/font/:family" element={<FontDetail fonts={fonts} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
