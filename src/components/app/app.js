import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { testIngredientSet } from "../../utils/testData";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";

export default function App() {
  const [burgerIngredients, setBurgerIngredients] = React.useState([]);

  useEffect(() => {
    const getInitialData = () => {
      getIngredients()
        .then((ingredients) => {
          setBurgerIngredients((burgerIngredients) => {
            const newIngredients = [];
            ingredients.data.forEach((el) => {
              if (
                !burgerIngredients.some(
                  (el2) => JSON.stringify(el) === JSON.stringify(el2)
                )
              ) {
                newIngredients.push(el);
              }
            });
            return [...burgerIngredients, ...newIngredients];
          });
        })
        .catch((err) => console.log(err));
    };
    getInitialData();
  }, []);

  return (
    <div className="page">
      <AppHeader />
      <main className={appStyles.main_content}>
        <BurgerIngredients ingredients={burgerIngredients} />
        <BurgerConstructor ingredientSet={testIngredientSet} />
      </main>
    </div>
  );
}
