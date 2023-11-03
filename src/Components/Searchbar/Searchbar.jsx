import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { AuthContext } from "../../Index";
import Fuse from "fuse.js";
import "./Searchbar.scss";
import $ from "jquery";
import axios from "axios";

export const Searchbar = () => {
  const { category, search, tags, store } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef();
  const location = useLocation();
  const { autoComplete, isLogged, user } = useContext(AuthContext);
  const [options, setOptions] = useState(null);
  const [viewOptions, setViewOptions] = useState(false);
  const [searchResults, setSearch] = useState("");
  const [searching, setSearching] = useState("");
  const [indexPosition, setIndexPosition] = useState(0);

  useEffect(() => {
    if (category) {
      setSearch(category.replace(/[-]+/g, " "));
      setSearching(category.replace(/[-]+/g, " "));
      searchAutoComplete(category.replace(/[-]+/g, " "));
    } else if (search) {
      setSearch(search.replace(/[-]+/g, " "));
      setSearching(search.replace(/[-]+/g, " "));
      searchAutoComplete(search.replace(/[-]+/g, " "));
    } else if (tags) {
      const categories = tags.split("-");
      const filter = categories.filter((item) => item != "Home");
      setSearch(filter[0]);
      setSearching(filter[0]);
      searchAutoComplete(filter[0]);
    } else if (store) {
      setSearch(store.replace(/[-]+/g, " "));
      setSearching(store.replace(/[-]+/g, " "));
      searchAutoComplete(store.replace(/[-]+/g, " "));
    } else {
      setSearch("");
      setSearching("");
      const newAutoComplete = Array.from(autoComplete);
      newAutoComplete.length = 8;
      setOptions(newAutoComplete);
    }
  }, [location]);

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
    const fuse = new Fuse(autoComplete, {
      ignoreLocation: true,
      distance: 0,
      threshold: 0.6,
    });
    const result = Array.from(fuse.search(value));
    const filters = result.map(({ item }) => item);
    if (filters.length > 8) {
      filters.length = 8;
      setOptions(filters);
    } else if (filters == 0) {
      const newOptions = Array.from(autoComplete);
      if (newOptions.length > 8) newOptions.length = 8;
      setOptions(newOptions);
    } else {
      setOptions(filters);
    }
    setIndexPosition(0);
  };

  const handleChange = (e) => {
    searchAutoComplete(e.target.value);
    setSearch(e.target.value);
    setSearching(e.target.value);
  };

  const addEvent = async (url, search) => {
    try {
      if (isLogged && user.rol == "CLIENTE") {
        const fp = await FingerPrint.load();
        const { visitorId } = await fp.get();
        await axios.post(
          `${import.meta.env.VITE_ANALYSTICS}/search/add-event`,
          {
            url: url,
            query: search,
            fingerprint: visitorId,
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToSearch = (filter) => {
    setSearch(filter);
    setSearching(filter);
    setIndexPosition(0);
    const newFilter = filter.trim().replace(/[ ]+/g, "");
    if (newFilter == "" || newFilter == " ") {
      const url = "/gt/products-results/all";
      navigate(url);
      addEvent(`https://tienda.gt${url}`, "");
    } else {
      const newSearch = filter.trim().replace(/[ ]+/g, "-");
      const url = `/gt/products-results/${newSearch}`;
      navigate(url);
      addEvent(`https://tienda.gt${url}`, filter);
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
      goToSearch(searchResults);
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
          value={searchResults}
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
        <label
          className="closeInput"
          onClick={() => {
            inputRef.current.blur();
          }}
        >
          <svg
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokLinecap="round"
            strokLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fillOpacity={0}
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </label>
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
