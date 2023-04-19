import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientsContext} from "../../services/appContext";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("buns");
  const [
    modalWithIngredientDetailsVisible,
    setModalWithIngredientDetailsVisible,
  ] = React.useState(false);
  const [modalIngredient, setModalIngredient] = React.useState(null);

  const {burgerIngredients} = React.useContext(IngredientsContext);

  const buns = burgerIngredients.filter((ingredient) => ingredient.type === "bun");
  const sauces = burgerIngredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  const mains = burgerIngredients.filter((ingredient) => ingredient.type === "main");

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
            setVisible={setModalWithIngredientDetailsVisible}
            setIngredient={setModalIngredient}
          />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <IngredientsCategory
            ingredients={sauces}
            setVisible={setModalWithIngredientDetailsVisible}
            setIngredient={setModalIngredient}
          />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <IngredientsCategory
            ingredients={mains}
            setVisible={setModalWithIngredientDetailsVisible}
            setIngredient={setModalIngredient}
          />
        </li>
      </ul>
      <div className="modal">
        {modalWithIngredientDetailsVisible && (
          <Modal
            header="Детали ингредиента"
            boxStyles="pt-10 pr-10 pb-15 pl-10"
            setVisible={setModalWithIngredientDetailsVisible}
          >
            <IngredientDetails ingredient={modalIngredient} />
          </Modal>
        )}
      </div>
    </section>
  );
}