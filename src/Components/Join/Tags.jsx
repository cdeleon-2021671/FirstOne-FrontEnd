import React, { useEffect, useState } from "react";
import { googleCategories } from "../../Words";
import { AiOutlineClose } from "react-icons/ai";
import Fuse from "fuse.js";
import "./Options.scss";

export const Tags = ({ form, setForm }) => {
  const [tag, setTag] = useState("");
  const [items, setItems] = useState([]);

  const changeTags = (e) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    const array = items.map((item) => item.category);
    setForm({
      ...form,
      tags: array,
    });
  }, [items]);

  return (
    <>
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
        </div>
      </div>
    </>
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
    const newArray = [];
    if (array.length != 0) {
      for (const key1 of array) {
        let flag = false;
        for (const key2 of items) {
          console.log('-------------------');
          console.log(array);
          console.log(items);
          console.log(key1);
          console.log(key2);
          console.log(key1.id == key2.id);
          if (key1.id == key2.id) {
            flag = true;
            break;
          }
        }
        if (flag) continue;
        newArray.push(key1);
      }
    }
    return newArray;
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
    setItems([...items, text]);
    const newCategories = Array.from(categories);
    newCategories.splice(key, 1);
    setCategories(newCategories);
    if (items.length == 9)
      new Notify({
        status: "error",
        title: "Lo siento!",
        text: "Límite de etiquetas alcanzado",
        effect: "fade",
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        type: 1,
        position: "right top",
      });
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
