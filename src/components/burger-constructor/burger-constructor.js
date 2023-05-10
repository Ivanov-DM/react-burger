import React, { useEffect } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT,
  ADD_PRICE,
  DEC_INGREDIENT_COUNT,
  DELETE_INGREDIENT,
  INC_INGREDIENT_COUNT,
  SUB_PRICE,
} from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order-details";
import SortedElement from "../sorted-element/sorted-element";
import { v4 as uuidv4 } from "uuid";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const [modalWithOrderDetailsVisible, setModalWithOrderDetailsVisible] =
    React.useState(false);

  const getStateForBurgerConstructor = (store) => {
    return {
      constructorIngredients:
        store.constructorIngredients.constructorIngredients,
      orderDetails: store.orderDetails.orderDetails,
      totalPrice: store.constructorIngredients.totalPrice,
    };
  };

  const { constructorIngredients, orderDetails, totalPrice } = useSelector(
    getStateForBurgerConstructor
  );

  const [bun] = constructorIngredients.bun;
  const sauceAndMain = constructorIngredients.fillings;

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (bun && bun._id === item._id) {
        return;
      }
      const constructorIngredient = Object.assign({}, item);
      constructorIngredient.uuid = uuidv4();
      dispatch({ type: ADD_INGREDIENT, ingredient: constructorIngredient });
      dispatch({
        type: INC_INGREDIENT_COUNT,
        ingredientId: constructorIngredient._id,
      });
      if (constructorIngredient.type !== "bun") {
        dispatch({ type: ADD_PRICE, price: constructorIngredient.price });
      } else if (bun && constructorIngredient.type === "bun") {
        dispatch({ type: SUB_PRICE, price: bun.price * 2 });
        dispatch({ type: ADD_PRICE, price: constructorIngredient.price * 2 });
        dispatch({ type: DEC_INGREDIENT_COUNT, ingredientId: bun._id });
      } else {
        dispatch({ type: ADD_PRICE, price: constructorIngredient.price * 2 });
      }
    },
  });

  const handleCloseBtn = (item, idx) => {
    dispatch({ type: DELETE_INGREDIENT, index: idx });
    dispatch({ type: SUB_PRICE, price: item.price });
    dispatch({ type: DEC_INGREDIENT_COUNT, ingredientId: item._id });
  };

  const submitOrder = () => {
    if (!bun || sauceAndMain.length === 0) {
      return;
    }
    const ingredientsId = [
      bun._id,
      ...sauceAndMain.map((ingredient) => ingredient._id),
    ];
    dispatch(createOrder(ingredientsId));
  };

  useEffect(() => {
    if (orderDetails !== null) {
      setModalWithOrderDetailsVisible(true);
    }
  }, [orderDetails]);

  return (
    <section
      className={`${burgerConstructorStyle.container} pt-25 pl-4`}
      ref={dropTarget}
    >
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
            <SortedElement key={ingredient.uuid} index={idx}>
              <span
                className={`${burgerConstructorStyle.ingredient_dragIcon} mr-2`}
              >
                <DragIcon type="primary" />
              </span>
              <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                handleClose={() => handleCloseBtn(ingredient, idx)}
              />
            </SortedElement>
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
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
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
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
}
