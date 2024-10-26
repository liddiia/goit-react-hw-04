import { useState } from "react";
import css from "../SearchBar/SearchBar.module.css";

import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    onSearch(query);
    setQuery("");
  };

  return (
    <header className={css.serchPlace}>
      <form onSubmit={handleSubmit}>
        <input className={css.searchInput}
        name="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images and photos"
        />
        <button className={css.searchButton} type="submit">Search</button>
      </form>
      <Toaster
        className={css.toaster}
        position="top-left"
        reverseOrder={false}
      />
    </header>
  );
};

export default SearchBar;
