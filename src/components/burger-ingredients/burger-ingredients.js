import React, { useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients() {
  const dispatch = useDispatch();

  const getBurgerIngredients = (store) => store.burgerIngredients.ingredients;
  const burgerIngredients = useSelector(getBurgerIngredients);

  const [activeTab, setActiveTab] = React.useState("buns");
  const [bunsRef, bunsInView, bunsTab] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesTab] = useInView({ threshold: 0 });
  const [mainsRef, mainsInView, mainsTab] = useInView({ threshold: 0 });

  const buns = burgerIngredients.filter(
    (ingredient) => ingredient.type === "bun"
  );
  const sauces = burgerIngredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  const mains = burgerIngredients.filter(
    (ingredient) => ingredient.type === "main"
  );

  const onTabClick = (tabType, entry) => {
    setActiveTab(tabType);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    mainsInView && setActiveTab("filling");
    saucesInView && setActiveTab("sauce");
    bunsInView && setActiveTab("buns");
  }, [bunsInView, saucesInView, mainsInView]);

  return (
    <section className={burgerIngredientsStyle.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={burgerIngredientsStyle.tabs}>
        <Tab
          value="buns"
          active={activeTab === "buns"}
          onClick={() => onTabClick("buns", bunsTab)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={activeTab === "sauce"}
          onClick={() => onTabClick("sauce", saucesTab)}
        >
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={activeTab === "filling"}
          onClick={() => onTabClick("filling", mainsTab)}
        >
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyle.ingredientTypeList}>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
            Булки
          </h2>
          <IngredientsCategory ingredients={buns} />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
            Соусы
          </h2>
          <IngredientsCategory ingredients={sauces} />
        </li>
        <li>
          <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainsRef}>
            Начинки
          </h2>
          <IngredientsCategory ingredients={mains} />
        </li>
      </ul>
    </section>
  );
}
