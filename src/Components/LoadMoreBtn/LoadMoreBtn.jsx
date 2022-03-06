import React from "react";
import style from './LoadMoreBtn.module.css'
import PropTypes from "prop-types";
const Button = ({more}) => (
    <div className={style.Button__wrapper}>
     <button type="button" className={style.Button} onClick={more}>
       Load more!
        </button>
    </div>
)
export default Button
Button.propTypes = {
    more: PropTypes.func
}