import React, { useState } from 'react';
import './css/Pagination.css'; // Assuming you're using a CSS file

const Pagination = ({ totalFonts, fontsPerPage, setCurrentPage, currentPage }) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // Track the current page group

  const totalPages = Math.ceil(totalFonts / fontsPerPage); // Calculate total pages based on total fonts
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Create an array of page numbers

  const pagesPerGroup = 10; // Define how many pages you want to show per group
  const startIndex = currentPageGroup * pagesPerGroup; // Calculate the start index of the current page group
  const endIndex = startIndex + pagesPerGroup; // Calculate the end index of the current page group
  const visiblePages = pages.slice(startIndex, endIndex); // Get the pages to display in the current group

  const handlePreviousGroup = () => {
    if (currentPageGroup > 0) {
      const newGroup = currentPageGroup - 1;
      setCurrentPageGroup(newGroup);
      setCurrentPage(newGroup * pagesPerGroup + 1); // Go to the first page of the new group
    }
  };

  const handleNextGroup = () => {
    if (endIndex < totalPages) {
      const newGroup = currentPageGroup + 1;
      setCurrentPageGroup(newGroup);
      setCurrentPage(newGroup * pagesPerGroup + 1); // Go to the first page of the new group
    }
  };

  return (
    <div className="pagination">
      {/* Previous Group Button */}
      <button
        onClick={handlePreviousGroup}
        disabled={currentPageGroup === 0}
        className="button"
      >
        &laquo;
      </button>

      {/* Page Number Buttons */}
      {visiblePages.map((page) => (
 <button
 key={page}
 onClick={() => setCurrentPage(page)}
 className={`button ${page === currentPage ? 'active' : ''}`} // Applies the new styles
>
 {page}
</button>

      ))}

      {/* Next Group Button */}
      <button
        onClick={handleNextGroup}
        disabled={endIndex >= totalPages}
        className="button"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
