import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Index";
import fussySearch from "fuzzy-search";
import "./Searchbar.scss";
import $ from "jquery";

export const Searchbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const { autoComplete } = useContext(AuthContext);
  const [options, setOptions] = useState(null);
  const [viewOptions, setViewOptions] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState("");
  const [indexPosition, setIndexPosition] = useState(0);

  useEffect(() => {
    const newAutoComplete = Array.from(autoComplete);
    newAutoComplete.length = 8;
    setOptions(newAutoComplete);
  }, []);

  const showOptions = () => {
    $(".searchbar-content").addClass("view");
    setViewOptions(true);
  };

  const hiddenOptions = () => {
    $(".searchbar-content").removeClass("view");
    setIndexPosition(0);
    setViewOptions(false);
  };

  const searchAutoComplete = (value) => {
    const newSearch = new fussySearch(autoComplete, {
      caseSensitive: false,
      sort: true,
    });
    const result = Array.from(newSearch.search(value));
    if (result.length > 8) result.length = 8;
    setOptions(result);
    setIndexPosition(0);
  };

  const handleChange = (e) => {
    searchAutoComplete(e.target.value);
    setSearch(e.target.value);
    setSearching(e.target.value);
  };

  const goToSearch = (filter) => {
    if (filter == "" || filter == " ") {
      navigate("/all-products-in-store");
    } else {
      const newSearch = filter.replace(/[ ]+/g,'-')
      navigate(`gt/products-results/${newSearch}`);
    }
  };

  const moveSelection = (e) => {
    if (e.keyCode == 40) {
      //abajo
      if (indexPosition == options.length) setIndexPosition(0);
      else setIndexPosition(indexPosition + 1);
    } else if (e.keyCode == 38) {
      //arriba
      if (indexPosition == 0) setIndexPosition(options.length);
      else setIndexPosition(indexPosition - 1);
    } else if (e.keyCode == 13) {
      //enter
      goToSearch(search);
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (indexPosition == 0) setSearch(searching);
    else setSearch(options[indexPosition - 1]);
  }, [indexPosition]);

  return (
    <div className="searchbar">
      <div className="searchbar-content">
        <Icon></Icon>
        <input
          type="text"
          id="mySearchbar"
          autoComplete="off"
          placeholder="Estoy buscando..."
          value={search}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={moveSelection}
          onFocus={showOptions}
          onBlur={() => {
            setTimeout(() => {
              hiddenOptions();
            }, 100);
          }}
        />
      </div>
      {options && options.length !== 0 && viewOptions && (
        <div className="searchbar-options">
          <div className="searchbar-options-container">
            {options.map((item, key) => (
              <div
                className={`searchbar-content ${
                  indexPosition == key + 1 && "isActive"
                }`}
                key={key}
                onClick={() => goToSearch(item)}
              >
                <Icon></Icon>
                <input type="text" value={item} readOnly autoComplete="off" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Icon = () => {
  return (
    <label htmlFor="mySearchbar">
      <svg
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
        <path d="M16 16l3 3" />
      </svg>
    </label>
  );
};
