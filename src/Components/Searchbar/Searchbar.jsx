import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FingerPrint from "@fingerprintjs/fingerprintjs";
import { AuthContext } from "../../Index";
import { GrClose } from "react-icons/gr";
import { GoSearch } from "react-icons/go";
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
        <PrincipalInput
          searchResults={searchResults}
          inputRef={inputRef}
          handleChange={handleChange}
          moveSelection={moveSelection}
          showOptions={showOptions}
          hiddenOptions={hiddenOptions}
          view={
            options && options.length != 0 && viewOptions ? "show" : "hiddem"
          }
        />
        {options && options.length !== 0 && viewOptions && (
          <div className="searchbar-content-options">
            {options.map((item, key) => (
              <SecundaryInput
                key={key}
                position={indexPosition}
                value={key}
                item={item}
                goToSearch={goToSearch}
              />
            ))}
          </div>
        )}
        {options && options.length != 0 && viewOptions && (
          <label className="close">
            <GrClose></GrClose>
          </label>
        )}
      </div>
      <button
        className="go"
        onClick={() => {
          goToSearch(searchResults);
          inputRef.current.blur();
        }}
      >
        BUSCAR
      </button>
    </div>
  );
};

const PrincipalInput = (props) => {
  const { searchResults, inputRef, handleChange, moveSelection } = props;
  const { showOptions, hiddenOptions, view } = props;
  return (
    <div className={`bar-container ${view}`}>
      <label htmlFor="mySearchbar" className="icon">
        <GoSearch />
      </label>
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
    </div>
  );
};

const SecundaryInput = ({ position, value, item, goToSearch }) => {
  return (
    <div
      className={`bar-container ${position == value + 1 && "isActive"}`}
      onClick={() => goToSearch(item)}
    >
      <label htmlFor="mySearchbar" className="icon">
        <GoSearch />
      </label>
      <input type="text" value={item} readOnly autoComplete="off" />
    </div>
  );
};
