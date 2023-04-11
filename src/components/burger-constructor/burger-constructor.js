import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import { ingredientProptypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

export default function BurgerConstructor(props) {
  const [modalWithOrderDetailsVisible, setModalWithOrderDetailsVisible] =
    React.useState(false);
  // параметр setOrder на данном этапе разработки не используется
  const [order, setOrder] = React.useState({ number: "034536" }); // eslint-disable-line

  const ingredientsSet = props.ingredientSet;
  const bun = ingredientsSet.find((ingredient) => ingredient.type === "bun");
  const sauceAndMain = ingredientsSet.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  const submitOrder = () => {
    setModalWithOrderDetailsVisible(true);
  };

  return (
    <section className={`${burgerConstructorStyle.container} pt-25 pl-4`}>
      <div className={`${burgerConstructorStyle.ingredient} pl-8 pr-4`}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />
        ) : null}
      </div>
      <ul className={`${burgerConstructorStyle.ingredient_list} mt-4 mb-4`}>
        {sauceAndMain.map((ingredient, idx) => {
          return (
            <li className={burgerConstructorStyle.ingredient} key={idx}>
              <span
                className={`${burgerConstructorStyle.ingredient_dragIcon} mr-2`}
              >
                <DragIcon type="primary" />
              </span>
              <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
              />
            </li>
          );
        })}
      </ul>
      <div className={`${burgerConstructorStyle.ingredient} ml-8 mr-4`}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            thumbnail={bun.image}
            price={bun.price}
          />
        ) : null}
      </div>
      <div className={`${burgerConstructorStyle.burgerInfo} mt-10 pr-4`}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <span className={burgerConstructorStyle.burgerInfo_priceIcon}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-10"
          onClick={submitOrder}
        >
          Оформить заказ
        </Button>
      </div>
      <div className="modal">
        {modalWithOrderDetailsVisible && (
          <Modal
            header=""
            boxStyles="pt-15 pr-10 pb-30 pl-10"
            setVisible={setModalWithOrderDetailsVisible}
          >
            <OrderDetails orderNumber={order.number} />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredientSet: PropTypes.arrayOf(ingredientProptypes.isRequired).isRequired,
};
