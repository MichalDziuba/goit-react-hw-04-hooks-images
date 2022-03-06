import React from "react";
import style from './Searchbar.module.css'
import PropTypes from "prop-types";
const Searchbar = ({searching}) => {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={searching} className={style.SearchForm}>
          <button type="submit" className={style.SearchForm__button}>
            <span className={style.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={style.SearchForm__input}
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}
export default Searchbar
Searchbar.propTypes = {
  searching: PropTypes.func
}