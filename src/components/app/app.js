import React, {useEffect, useReducer, useState} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getIngredients } from "../../utils/burger-api";
import {IngredientsContext, TotalPriceContext} from "../../services/appContext";

export default function App() {
  const [burgerIngredients, setBurgerIngredients] = useState([]);

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
        <IngredientsContext.Provider value={{burgerIngredients, setBurgerIngredients}}>
            <BurgerIngredients />
            <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}
