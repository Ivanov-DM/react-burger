import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import ingredientsCategoryStyle from "./ingredients-category.module.css";
import PropTypes from "prop-types";
import {ingredientProptypes} from "../../utils/prop-types";

export default function IngredientsCategory(props) {
    const ingredients = props.ingredients;

    const onClickHandler = (ingredient) => {
        props.setVisible(true);
        props.setIngredient({...ingredient});
    }


    return (
        <ul className={ingredientsCategoryStyle.ingredients}>
            {
                ingredients.map((ingredient, idx) => {
                    return (
                        <li
                            className={ingredientsCategoryStyle.ingredient}
                            key={idx}
                            onClick={() => onClickHandler(ingredient)}
                        >
                            <BurgerIngredient ingredient={ingredient}/>
                        </li>
                    )
                })
            }
        </ul>
    )
};

IngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientProptypes.isRequired).isRequired,
    setVisible: PropTypes.func.isRequired,
    setIngredient: PropTypes.func.isRequired
}