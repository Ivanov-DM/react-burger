import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.css";
import { ingredientProptypes } from "../../utils/prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function BurgerIngredient(props) {
  const location = useLocation();
  const ingredient = props.ingredient;

  const getIngredientCount = (store) =>
    store.constructorIngredients.ingredientsCount;

  const ingredientsCount = useSelector(getIngredientCount);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <Link
      key={ingredient._id}
      to={`ingredients/${ingredient._id}`}
      state={{ background: location }}
      className={burgerIngredientStyles.link}
    >
      <div className={burgerIngredientStyles.ingredientBox} ref={dragRef}>
        <img
          className={burgerIngredientStyles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        {ingredientsCount[ingredient._id] ? (
          <Counter
            className={burgerIngredientStyles.counter}
            count={ingredientsCount[ingredient._id]}
            size="default"
          />
        ) : (
          ""
        )}
        <p
          className={`${burgerIngredientStyles.price} text text_type_digits-default mr-2`}
        >
          {ingredient.price}
        </p>
        <div className={burgerIngredientStyles.priceIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <h3
          className={`${burgerIngredientStyles.name} text text_type_main-default`}
        >
          {ingredient.name}
        </h3>
      </div>
    </Link>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientProptypes.isRequired,
};
