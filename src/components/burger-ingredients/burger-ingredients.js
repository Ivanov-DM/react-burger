import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { ingredientProptypes } from "../../utils/prop-types";
import IngredientsCategory from "../ingredients-category/ingredients-category";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("buns");
  const ingredients = props.ingredients;
  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  const mains = ingredients.filter((ingredient) => ingredient.type === "main");

  return (
    <section className={burgerIngredientsStyle.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={burgerIngredientsStyle.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "filling"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyle.ingredientTypeList}>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <IngredientsCategory
            ingredients={buns}
            setVisible={props.setVisible}
            setIngredient={props.setIngredient}
          />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <IngredientsCategory
            ingredients={sauces}
            setVisible={props.setVisible}
            setIngredient={props.setIngredient}
          />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <IngredientsCategory
            ingredients={mains}
            setVisible={props.setVisible}
            setIngredient={props.setIngredient}
          />
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientProptypes.isRequired).isRequired,
  setVisible: PropTypes.func.isRequired,
  setIngredient: PropTypes.func.isRequired,
};
