import React, { useContext, useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import $ from "jquery";
import { AuthContext } from "../../Index";
import "./Searchbar.scss";
import { useNavigate } from "react-router-dom";

export const Searchbar = () => {
  const { autoComplete } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [options, setOptions] = useState(null);
  const [search, setSearch] = useState("");
  const [actual, setActual] = useState("");
  const [indexOption, setIndexOption] = useState(0);
  const [viewOptions, setViewOptions] = useState(false);

  const searchOptions = (value) => {
    const newOptions = autoComplete.filter((item) => {
      const mySearch = value.toLowerCase();
      const recomendation = item.toLowerCase();
      if (recomendation.includes(mySearch)) return item;
    });
    if (newOptions.length > 8) newOptions.length = 8;
    setOptions(newOptions);
  };

  const handleChange = (e) => {
    searchOptions(e.target.value);
    setSearch(e.target.value);
    setActual(e.target.value);
  };

  const goToSearch = (filter) => {
    navigate(`/searching/${filter}`);
  };

  const moveSelection = (e) => {
    if (e.keyCode == 40) {
      //abajo
      if (indexOption == options.length) setIndexOption(0);
      else setIndexOption(indexOption + 1);
    } else if (e.keyCode == 38) {
      //arriba
      if (indexOption == 0) setIndexOption(options.length);
      else setIndexOption(indexOption - 1);
    } else if (e.keyCode == 13) {
      //enter
      goToSearch(search);
      inputRef.current.blur();
    }
  };

  const focusInput = () => {
    $("#searchbar-container").addClass("isActive");
    setViewOptions(true);
  };

  const blurInput = () => {
    $("#searchbar-container").removeClass("isActive");
    setIndexOption(0);
    setViewOptions(false);
  };

  useEffect(() => {
    const newAutoComplete = Array.from(autoComplete);
    newAutoComplete.length = 8;
    setOptions(newAutoComplete);
  }, []);

  useEffect(() => {
    if (indexOption == 0) setSearch(actual);
    else setSearch(options[indexOption - 1]);
  }, [indexOption]);

  return (
    <div id="searchbar-container">
      <div>
        <label htmlFor="search-icon">
          <FiSearch></FiSearch>
        </label>
        <input
          type="text"
          id="search-icon"
          autoComplete="off"
          placeholder="Estoy buscando..."
          value={search}
          onChange={handleChange}
          onKeyUp={moveSelection}
          onFocus={focusInput}
          onBlur={() =>
            setTimeout(() => {
              blurInput();
            }, 200)
          }
          ref={inputRef}
        />
      </div>
      {options &&
        viewOptions &&
        options.map((item, key) => {
          return (
            <div
              className="result"
              key={key}
              style={{ background: indexOption == key + 1 ? "#d8d8d8" : "" }}
              onClick={() => goToSearch(item)}
            >
              <label>
                <FiSearch></FiSearch>
              </label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Estoy buscando..."
                readOnly
                value={item}
              />
            </div>
          );
        })}
    </div>
  );
};
