import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FontAPI = ({ sortOption, setFonts }) => {
  const [loading, setLoading] = useState(true);

  const fetchFonts = async (sort) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA1AeGFpEZaoa_j5rQQkZmLP2yYPsdtrmc&sort=${sort}`
      );

      // Filter out icon fonts based on family name or subsets
      const filteredFonts = response.data.items.filter((font) => {
        // Exclude fonts that have names commonly used by icon fonts
        const iconFontNames = ["icons", "material", "symbol", "emoji"];
        const familyLower = font.family.toLowerCase();

        // Check if the family name contains keywords associated with icon fonts
        const isIconFontByName = iconFontNames.some((name) => familyLower.includes(name));

        // Optionally, check if the subset includes "icons"
        const isIconFontBySubset = font.subsets.includes("icons");

        // Return fonts that are NOT icon fonts
        return !isIconFontByName && !isIconFontBySubset;
      });

      setFonts(filteredFonts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fonts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFonts(sortOption);
  }, [sortOption]);

  return loading ? <div>Loading fonts...</div> : null;
};

export default FontAPI;
