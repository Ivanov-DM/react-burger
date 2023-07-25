import ingredientDetailsStyles from "./ingredient-details.module.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getIngredients} from "../../services/actions/burger-ingredients";
import PropTypes from "prop-types";

export default function IngredientDetails({inModal}) {
  const { ingredientId } = useParams();
  const dispatch = useDispatch();
  const getBurgerIngredients = (store) => store.burgerIngredients.ingredients;
  const burgerIngredients = useSelector(getBurgerIngredients);
  let ingredientDetails = {};

  if (burgerIngredients.length !== 0) {
    ingredientDetails = burgerIngredients.find(ingredient => ingredient._id === ingredientId);
  }

  useEffect(() => {
    if (burgerIngredients.length === 0) {
      dispatch(getIngredients());
    }
  }, []);

  return (
    <div className={!inModal ? ingredientDetailsStyles.withoutModal : ''}>
      {!inModal ? <h1 className="text text_type_main-large">Детали ингредиента</h1> : null}
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
    </div>
  );
}

IngredientDetails.propTypes = {
  inModal: PropTypes.bool.isRequired
}
