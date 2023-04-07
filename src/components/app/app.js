import React, { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { testIngredientSet } from "../../utils/testData";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {
  const [burgerIngredients, setBurgerIngredients] = React.useState([]);
  const [
    modalWithIngredientDetailsVisible,
    setModalWithIngredientDetailsVisible,
  ] = React.useState(false);
  const [modalWithOrderDetailsVisible, setModalWithOrderDetailsVisible] =
    React.useState(false);
  const [order, setOrder] = React.useState({ number: "034536" });
  const [modalIngredient, setModalIngredient] = React.useState({});

  useEffect(() => {
    const getInitialData = () => {
      fetch(API_URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((ingredients) => {
          setBurgerIngredients([...burgerIngredients, ...ingredients.data]);
        })
        .catch((err) => console.log(err));
    };
    getInitialData();
  }, []);

  const modalWithIngredientDetails = (
    <Modal
      header="Детали ингредиента"
      boxStyles="pt-10 pr-10 pb-15 pl-10"
      setVisible={setModalWithIngredientDetailsVisible}
    >
      <IngredientDetails ingredient={modalIngredient} />
    </Modal>
  );

  const modalWithOrderDetails = (
    <Modal
      header=""
      boxStyles="pt-15 pr-10 pb-30 pl-10"
      setVisible={setModalWithOrderDetailsVisible}
    >
      <OrderDetails orderNumber={order.number} />
    </Modal>
  );

  return (
    <div className="page">
      <AppHeader />
      <main className={appStyles.main_content}>
        <BurgerIngredients
          ingredients={burgerIngredients}
          setVisible={setModalWithIngredientDetailsVisible}
          setIngredient={setModalIngredient}
        />
        <BurgerConstructor
          ingredientSet={testIngredientSet}
          setVisible={setModalWithOrderDetailsVisible}
        />
      </main>
      <div className={appStyles.modal}>
        {modalWithIngredientDetailsVisible && modalWithIngredientDetails}
      </div>
      <div className={appStyles.modal}>
        {modalWithOrderDetailsVisible && modalWithOrderDetails}
      </div>
    </div>
  );
}
