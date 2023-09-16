import React from "react";
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
import { useDispatch, useSelector } from "../../services/types/hook";
import {
  addIngredientAction,
  addPriceAction,
  decIngredientAction,
  deleteIngredientAction,
  incIngredientAction,
  subPriceAction,
} from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order";
import SortedElement from "../sorted-element/sorted-element";
import { useNavigate } from "react-router";
import Loader from "../loader/loader";
import { RootState } from "../../services/types";
import { TIngredientData } from "../../services/types/data";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inModal, setInModal] = React.useState(false);

  const getStateForBurgerConstructor = (store: RootState) => {
    return {
      constructorIngredients:
        store.constructorIngredients.constructorIngredients,
      orderSuccess: store.orderData.orderSuccess,
      orderError: store.orderData.orderError,
      totalPrice: store.constructorIngredients.totalPrice,
    };
  };

  const { constructorIngredients, orderSuccess, orderError, totalPrice } =
    useSelector(getStateForBurgerConstructor);

  const getUserData = (store: RootState) => store.userData.user;
  const user = useSelector(getUserData);

  const [bun] = constructorIngredients.bun;
  const sauceAndMain = constructorIngredients.fillings;

  const [, dropTarget] = useDrop<TIngredientData, unknown, unknown>({
    accept: "ingredient",
    drop(item) {
      if (bun && bun._id === item._id) {
        return;
      }
      dispatch(addIngredientAction(item));
      dispatch(incIngredientAction(item._id));
      if (item.type !== "bun") {
        dispatch(addPriceAction(item.price));
      } else if (bun && item.type === "bun") {
        dispatch(subPriceAction(bun.price * 2));
        dispatch(addPriceAction(item.price * 2));
        dispatch(decIngredientAction(bun._id));
      } else {
        dispatch(addPriceAction(item.price * 2));
      }
    },
  });

  const handleCloseBtn = (item: TIngredientData, idx: number) => {
    dispatch(deleteIngredientAction(idx));
    dispatch(subPriceAction(item.price));
    dispatch(decIngredientAction(item._id));
  };

  const submitOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!bun || sauceAndMain.length === 0) {
      return;
    }
    const ingredientsId = [
      bun._id,
      ...sauceAndMain.map((ingredient) => ingredient._id),
      bun._id,
    ];
    dispatch(createOrder(ingredientsId));
    setInModal(true);
  };

  const modalOnClose = () => {
    setInModal(false);
  };

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
        {inModal && (
          <Modal
            header=""
            boxStyles="pt-15 pr-10 pb-30 pl-10"
            onClose={modalOnClose}
          >
            {orderSuccess ? (
              <OrderDetails />
            ) : orderError ? (
              <>
                <p className="text text_type_main-large text_color_error pt-20 pb-20">
                  Что-то пошло не так...
                </p>
                <p className="text text_type_main-medium pb-5">
                  К сожалению мы не получили ваш заказ,
                </p>
                <p className="text text_type_main-medium pb-20">
                  попробуйте оформить его снова
                </p>
              </>
            ) : (
              <Loader />
            )}
          </Modal>
        )}
      </div>
    </section>
  );
}
