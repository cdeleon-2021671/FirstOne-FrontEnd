import React, { useContext, useEffect, useState, useRef } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../Index";
import { useNavigate } from "react-router-dom";
import "./Searchbar.scss";

export const Searchbar = ({ filter = "" }) => {
  const { autoComplete } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [options, setOptions] = useState(null);
  const [search, setSearch] = useState("");
  const [actual, setActual] = useState(filter);
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
    setViewOptions(true);
  };

  const blurInput = () => {
    setIndexOption(0);
    setViewOptions(false);
  };

  useEffect(() => {
    const newAutoComplete = Array.from(autoComplete);
    newAutoComplete.length = 8;
    setOptions(newAutoComplete);
  }, []);
  
  useEffect(() => {
    handleChange({target: {value: filter}});
  }, [filter]);

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
            }, 100)
          }
          ref={inputRef}
        />
        {viewOptions == true && (
          <AiFillCloseSquare id="closeSearch" onClick={blurInput} />
        )}
      </div>
      {options && options.length != 0 && viewOptions === true && (
        <div className="autoCompleteOptions">
          {options.map((item, key) => {
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
      )}
    </div>
  );
};
