import ingredientDetailsStyles from "./ingredient-details.module.css";
import React from "react";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const ingredientDetails = useSelector(
    (store) => store.ingredientDetails.ingredientDetails
  );

  return (
    <>
      <img
        className={ingredientDetailsStyles.image}
        src={ingredientDetails.image}
        alt={ingredientDetails.name}
      />
      <h3
        className={`${ingredientDetailsStyles.name} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredientDetails.name}
      </h3>
      <ul className={ingredientDetailsStyles.details}>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.fat}
          </p>
        </li>
        <li className={ingredientDetailsStyles.details__item}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}
