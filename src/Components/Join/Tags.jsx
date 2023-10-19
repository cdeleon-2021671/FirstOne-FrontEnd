import React, { useEffect, useState } from "react";
import { googleCategories } from "../../Words";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Fuse from "fuse.js";
import "./Options.scss";

export const Tags = () => {
  const { storeId } = useParams();
  const [tag, setTag] = useState("");
  const [items, setItems] = useState([]);

  const changeTags = (e) => {
    setTag(e.target.value);
  };

  return (
    <div className="register-form">
      <div className="form">
        <div className="container step2">
          <div className="container-form">
            <span className="container-form-title">Etiquetas de la tienda</span>
            <div className="container-form-data">
              <input
                type="text"
                placeholder="Tu categoría"
                onChange={changeTags}
                value={tag}
              />
              <TagsSelected
                categories={items}
                setCategories={setItems}
              ></TagsSelected>
              <AutoComplete
                search={tag}
                setItems={setItems}
                items={items}
              ></AutoComplete>
              <Link
                className="container-btn"
                to={`/join/trade-online/step2/shipping/${storeId}`}
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TagsSelected = ({ categories, setCategories }) => {
  const removeItem = (key) => {
    let newCategories = Array.from(categories);
    newCategories.splice(key, 1);
    setCategories(newCategories);
  };

  return (
    <>
      {categories.length != 0 && (
        <div className="options-tags" id="tags-container">
          {categories.map((item, key) => (
            <label className="options-tags-option" key={key}>
              {item.category} <AiOutlineClose onClick={() => removeItem(key)} />
            </label>
          ))}
        </div>
      )}
    </>
  );
};

const AutoComplete = ({ search, setItems, items }) => {
  const [categories, setCategories] = useState(null);

  const cleanCategories = (array) => {
    if (array.length != 0) {
      for (const key1 in array) {
        for (const key2 in items) {
          if (array[key1].id == items[key2].id) {
            array.splice(key1, 1);
          }
        }
      }
    }
    return array;
  };

  useEffect(() => {
    if (googleCategories) {
      const fuse = new Fuse(googleCategories, {
        ignoreLocation: true,
        distance: 0,
        threshold: 0.6,
        keys: ["category"],
      });
      const result = Array.from(fuse.search(search));
      let filters = result.map(({ item }) => item);
      filters = cleanCategories(filters);
      if (filters.length > 10) filters.length = 10;
      setCategories(filters);
      if (search == "") getCategories();
      if (items.length == 10) setCategories([]);
    }
  }, [search, items]);

  const getCategories = () => {
    if (googleCategories) {
      let newCategories = Array.from(googleCategories);
      newCategories = cleanCategories(newCategories);
      if (newCategories.length > 10) newCategories.length = 10;
      setCategories(newCategories);
    }
  };

  useEffect(() => {
    getCategories();
  }, [googleCategories]);

  const addTag = (text, key) => {
    if (items.length < 10) {
      setItems([...items, text]);
      const newCategories = Array.from(categories);
      newCategories.splice(key, 1);
      setCategories(newCategories);
    } else {
      new Notify({
        status: "error",
        title: "Lo siento!",
        text: "Limite de etiquetas alcanzado",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
    }
  };

  return (
    <>
      {categories && categories.length != 0 && (
        <div className="options-tags">
          {categories.map((item, key) => (
            <label
              className="options-tags-autocomplete"
              key={key}
              onClick={() => addTag(item, key)}
            >
              {item.category}
            </label>
          ))}
        </div>
      )}
    </>
  );
};
