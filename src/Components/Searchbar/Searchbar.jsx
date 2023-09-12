import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../Index";
import "./Searchbar.scss";

export const Searchbar = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { autoComplete } = useContext(AuthContext);
  const [options, setOptions] = useState(null);
  const [viewOptions, setViewOptions] = useState(false);
  const [indexOption, setIndexOption] = useState(0);
  const [before, setBefore] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const newOptions = [];
    for (const element of autoComplete) {
      if (newOptions.length == 8) break;
      newOptions.push(element);
    }
    setOptions(newOptions);
  }, []);

  const searchFilter = (filter) => {
    const newArray = [];
    for (const element of autoComplete) {
      if (newArray.length == 8) break;
      const actualSearch = filter.toLowerCase();
      const item = element.toLowerCase();
      if (item.includes(actualSearch)) newArray.push(element);
    }
    setOptions(newArray);
  };

  const handleChange = (e) => {
    searchFilter(e.target.value);
    setSearch(e.target.value);
    setBefore(e.target.value);
  };

  const moveSelection = (e) => {
    if (e.keyCode == 40) {
      //arriba
      if (indexOption == options.length) setIndexOption(0);
      else setIndexOption(indexOption + 1);
    } else if (e.keyCode == 38) {
      //abajo
      if (indexOption == 0) setIndexOption(options.length);
      else setIndexOption(indexOption - 1);
    } else if (e.keyCode == 13) {
      //enter
      goToSearch(search);
    }
  };

  useEffect(() => {
    if (indexOption == 0) setSearch(before);
    else setSearch(options[indexOption - 1]);
  }, [indexOption]);

  const goToSearch = (filter)=>{
    setSearch(filter);
    setBefore(filter);
    inputRef.current.blur();
    navigate(`/searching/${filter}`);
  }

  return (
    <div className="searchbarContainer">
      <div>
        <label htmlFor="mySearchbar">
          <FiSearch></FiSearch>
        </label>
        <input
          type="text"
          id="mySearchbar"
          placeholder="Estás buscando..."
          autoComplete="off"
          autoCorrect="true"
          ref={inputRef}
          value={search}
          onChange={handleChange}
          onKeyDown={moveSelection}
          onFocus={() => setViewOptions(true)}
          onBlur={() => {
            setTimeout(() => {
              setViewOptions(false);
              setIndexOption(0);
            }, 100);
          }}
        />
      </div>
      {viewOptions && options && (
        <div className="autoComplete">
          {options.map((item, key) => (
            <div
              key={key}
              style={{ background: indexOption == key + 1 ? "#f1f1f1" : "" }}
              onClick={()=>goToSearch(item)}
            >
              <label>
                <FiSearch></FiSearch>
              </label>
              <input type="text" value={item} readOnly />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
