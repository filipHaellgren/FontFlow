import React, { useState } from 'react';
import FontAPI from './FontApi';
import FontCard from './FontCard';
import Pagination from './Pagination';
import ControlBox from './ControlBox';
import FontDetail from './FontDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';

function App() {
  const [fonts, setFonts] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const fontsPerPage = 20;

  const handleFilterChange = (filter) => {
    setSortOption(filter);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Pagination logic
  const indexOfLastFont = currentPage * fontsPerPage;
  const indexOfFirstFont = indexOfLastFont - fontsPerPage;
  const filteredFonts = fonts.filter((font) =>
    font.family.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentFonts = filteredFonts.slice(indexOfFirstFont, indexOfLastFont);

  return (
    <Router>
      <div className="main-layout">
        {/* Left section for ControlBox and Title */}
        <div className="left-column">
          <h1 className="site-title">FontFlow</h1>
          <div className="control-box">
            <ControlBox onFilterChange={handleFilterChange} onSearch={handleSearch} />
          </div>
        </div>

        {/* Right section for font cards and content */}
        <div className="font-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FontAPI sortOption={sortOption} setFonts={setFonts} />
                  <div className="fontGrid">
                    {currentFonts.length > 0 ? (
                      currentFonts.map((font) => (
                        <FontCard key={font.family} family={font.family} />
                      ))
                    ) : (
                      <p>No fonts to display</p>
                    )}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    totalFonts={filteredFonts.length}
                    fontsPerPage={fontsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </>
              }
            />
            <Route path="/font/:family" element={<FontDetail fonts={fonts} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
