import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { AuthContext } from "../../Index";
import "./Suggestion.scss";
import axios from "axios";

export const Suggestion = ({ options, title, valid }) => {
  const location = useLocation();
  const { isLogged, user } = useContext(AuthContext);
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
    const sortedItems = Object.keys(frequencyMap).sort(
      (a, b) => frequencyMap[b] - frequencyMap[a]
    );
    setSuggestions(sortedItems.splice(0, 3));
  };

  useEffect(() => {
    if (options && options.length != 0) {
      getAutoComplete();
      if (location.pathname.includes("/gt/products-results/") || category) {
        setViewSuggestion(true);
      }
    }
  }, [options]);

  const addEvent = async (url, search) => {
    try {
      if (isLogged && user && user.rol != "CLIENTE") return;
      const fp = await FingerPrint.load();
      const { visitorId } = await fp.get();
      await axios.post(`${import.meta.env.VITE_ANALYSTICS}/search/add-event`, {
        url: url,
        query: search,
        fingerprint: visitorId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {viewSuggestion && title != "No" && (
        <div className="suggestion-container">
          <h2 className="title">
            {valid == 0 && location.pathname.includes('products-results') ? `No se encontraron resultados, pero quizá te guste:` : title != "" ? (
              <>Resultados para: {title.replace(/[-]+/g, " ")}</>
            ) : (
              "Todos los resultados"
            )}
          </h2>
          {suggestions && suggestions.length !== 0 && (
            <div className="suggestion">
              <label className="suggestion-title">Ver más:</label>
              {suggestions.map((item, key) => (
                <Link
                  key={key}
                  to={`/${item.replace(/[ ]+/g, "-")}`}
                  onClick={() =>
                    addEvent(
                      `https://tienda.gt/${item.replace(/[ ]+/g, "-")}`,
                      item
                    )
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
