import styles from "./orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { BURGER_API_WEBSOCKET_URL } from "../../utils/constants";
import Loader from "../loader/loader";
import { getCookie } from "../../utils/cookie";
import { OrderCard } from "../order-card/order-card";
import { useMatch } from "react-router";
import {
  connectProfileOrders,
  disconnectProfileOrders,
} from "../../services/actions/profile-orders";
import {
  connectFeedOrders,
  disconnectFeedOrders,
} from "../../services/actions/feed-orders";

export const Orders = () => {
  const dispatch = useDispatch();
  const match = useMatch({
    path: "/profile/orders",
    end: true,
    caseSensitive: true,
  });

  const getBurgerIngredients = (store) => store.burgerIngredients.ingredients;
  const burgerIngredients = useSelector(getBurgerIngredients);

  const getOrdersData = (store) => {
    let ordersData;
    if (match) {
      ordersData = store.profileOrders.ordersData;
    } else {
      ordersData = store.feedOrders.ordersData;
    }
    return ordersData;
  };

  const ordersData = useSelector(getOrdersData);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (match) {
      dispatch(
        connectProfileOrders(
          `${BURGER_API_WEBSOCKET_URL}/orders?token=${getCookie("accessToken")}`
        )
      );
    } else {
      dispatch(connectFeedOrders(`${BURGER_API_WEBSOCKET_URL}/orders/all`));
    }
    return () => {
      if (match) {
        dispatch(disconnectProfileOrders());
      } else {
        dispatch(disconnectFeedOrders());
      }
    };
  }, [dispatch]);

  if (!ordersData || !burgerIngredients) {
    return (
      <div className="loaderContainer">
        <Loader />
      </div>
    );
  }

  let orders = ordersData.orders;
  if (match) {
    orders = [...orders].reverse();
  }

  return (
    <div className={styles.container}>
      <ul className={styles.ordersList}>
        {orders.map((order, idx) => {
          return (
            <li key={idx}>
              <OrderCard
                key={idx}
                orderData={order}
                ingredients={burgerIngredients}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
