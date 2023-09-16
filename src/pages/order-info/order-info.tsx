import { useParams } from "react-router";
import styles from "./order-info.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/types/hook";
import Loader from "../../components/loader/loader";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/burger-ingredients";
import {
  calculateTotalPrice,
  getIngredientsWithCount,
  getTimeZone,
  TIngredientsWithCountObj,
} from "../../utils/order";
import { ORDER_STATUS } from "../../utils/constants";
import { getOrder } from "../../services/actions/order";
import { RootState } from "../../services/types";

interface IOrderInfoPageProps {
  inModal: boolean;
}

type TIdParams = {
  id: string;
};

export const OrderInfoPage = ({ inModal }: IOrderInfoPageProps) => {
  const { id } = useParams<TIdParams>();
  const dispatch = useDispatch();
  let ingredientsWithCount: Array<TIngredientsWithCountObj> = [];
  let timeZone;
  let formattedDate;
  let totalPrice;

  const getBurgerIngredients = (store: RootState) =>
    store.burgerIngredients.ingredients;
  const burgerIngredients = useSelector(getBurgerIngredients);
  const getIngredientsRequest = (store: RootState) =>
    store.burgerIngredients.ingredientsRequest;
  const ingredientsRequest = useSelector(getIngredientsRequest);

  const findOrder = (store: RootState) => {
    let order;
    if (store.feedOrders.ordersData) {
      order = store.feedOrders.ordersData.orders.find(
        (order) => order.number === +id!
      );
      if (order) {
        return order;
      }
    }
    if (store.profileOrders.ordersData) {
      order = store.profileOrders.ordersData.orders.find(
        (order) => order.number === +id!
      );
      if (order) {
        return order;
      }
    }
    order = store.orderData.orderByNumber;
    if (order) {
      return order;
    }
    return null;
  };
  const order = useSelector(findOrder);
  const getOrderRequest = (store: RootState) => store.orderData.getOrderRequest;
  const orderRequest = useSelector(getOrderRequest);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(id));
    }
  }, [dispatch]);

  if (burgerIngredients.length !== 0 && order) {
    const ingredientDataList = getIngredientsWithCount(
      order,
      burgerIngredients
    );
    timeZone = getTimeZone(order.updatedAt);
    formattedDate = <FormattedDate date={new Date(order.updatedAt)} />;
    totalPrice = calculateTotalPrice(ingredientDataList);
    for (let key in ingredientDataList) {
      ingredientsWithCount.push(ingredientDataList[key]);
    }
  }

  if (orderRequest || ingredientsRequest) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.notFoundMessage}>
        <p className="text text_type_main-medium text_color_accent">
          Заказа с таким номером нет
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${
        !inModal && styles.containerNotInModal
      }`}
    >
      {!inModal && (
        <h2
          className={`text text_type_digits-default mb-10 ${styles.orderNumber}`}
        >
          &#35;{order.number}
        </h2>
      )}
      <p className={`text text_type_main-medium ${inModal && "mt-10"} mb-3`}>
        {order.name}
      </p>
      <p
        className={`text text_type_main-default mb-15 ${
          order.status === "done" ? ORDER_STATUS.done.textColor : ""
        }`}
      >
        {ORDER_STATUS[order.status].title}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.ingredientList}>
        {ingredientsWithCount.map((item, idx) => {
          return (
            <li key={idx}>
              <div className={styles.ingredientInfo}>
                <div className={styles.ingredient}>
                  <div className={styles.imageBorder}>
                    <img
                      src={item.ingredient.image}
                      alt={item.ingredient.name}
                      className={styles.ingredientPreview}
                    />
                  </div>
                </div>
                <p
                  className={`text text_type_main-default ${styles.ingredientTitle}`}
                >
                  {item.ingredient.name}
                </p>
                <div className={styles.price}>
                  <p className="text text_type_digits-default mr-2">
                    {`${item.count} x ${item.ingredient.price}`}
                  </p>
                  <span className={styles.priceIcon}>
                    <CurrencyIcon type="primary" />
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.orderIdAndTimestamp}>
        <p className="text text_type_main-small text_color_inactive">
          {formattedDate} i-{timeZone}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">{totalPrice}</p>
          <span className={styles.priceIcon}>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};
