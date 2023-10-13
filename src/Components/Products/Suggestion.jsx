import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import "./Suggestion.scss";

export const Suggestion = ({ options }) => {
  const location = useLocation();
  const { category, search } = useParams();
  const [suggestions, setSuggestions] = useState(null);
  const [viewSuggestion, setViewSuggestion] = useState(false);

  const getAutoComplete = () => {
    let allTags = [];
    options.forEach(({ tags }) => {
      tags.forEach((element) => {
        const tag = element.replace("#", "");
        const newCategory = category ? category.replace(/[-]+/g, " ") : "";
        const newSearch = search ? search.replace(/[-]+/g, " ") : "";
        if (tag != "Home" && tag != newCategory && tag != newSearch)
          allTags.push(tag);
      });
    });
    const frequencyMap = {};
    for (const item of allTags) {
      if (frequencyMap[item]) {
        frequencyMap[item]++;
      } else {
        frequencyMap[item] = 1;
      }
    }
    const sortedItems = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
    setSuggestions(sortedItems.splice(0, 3));
  };

  useEffect(() => {
    getAutoComplete();
    if (location.pathname.includes("/gt/products-results/") || category) {
      setViewSuggestion(true);
    }
  }, [options]);

  return (
    <>
      {viewSuggestion && (
        <>
          {suggestions && suggestions.length !== 0 && (
            <div className="suggestion">
              <label className="suggestion-title">Ver más:</label>
              {suggestions.map((item, key) => (
                <Link key={key} to={`/${item.replace(/[ ]+/g, "-")}`}>
                  {item}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
