import ingredientDetailsStyles from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function IngredientDetails(props) {
  const ingredient = props.ingredient;

  return (
    <>
      <img
        className={ingredientDetailsStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h3
        className={`${ingredientDetailsStyles.name} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredient.name}
      </h3>
      <ul className={ingredientDetailsStyles.details}>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
