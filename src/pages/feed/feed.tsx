import { useSelector } from "../../services/types/hook";
import React, { useMemo } from "react";
import styles from "./feed.module.css";
import { Orders } from "../../components/orders/orders";
import {RootState} from "../../services/types";

export const FeedPage = () => {
  const getOrdersData = (store: RootState) => store.feedOrders.ordersData;
  const ordersData = useSelector(getOrdersData);

  const doneOrderList = useMemo(() => {
    if (ordersData) {
      return ordersData.orders.filter((order) => order.status === "done");
    }
  }, [ordersData]);

  const inWorkOrderList = useMemo(() => {
    if (ordersData) {
      return ordersData.orders.filter((order) => order.status === "pending");
    }
  }, [ordersData]);

  return (
    <main className={styles.mainContainer}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <div className={styles.orderInfo}>
        <Orders />
        {ordersData && (
          <div className={styles.statsContainer}>
            <div className={styles.ordersBoard}>
              <h2
                className={`${styles.doneOrdersTitle} text text_type_main-medium mb-6`}
              >
                Готовы:
              </h2>
              <ul
                className={`${styles.doneOderList} ${styles.orderNumberList}`}
              >
                {doneOrderList!.map((order, idx) => {
                  return (
                    <li
                      key={idx}
                      className="text text_type_digits-default text_color_success"
                    >
                      {order.number}
                    </li>
                  );
                })}
              </ul>
              <h2
                className={`${styles.inWorkOrdersTitle} text text_type_main-medium mb-6`}
              >
                В работе:
              </h2>
              <ul
                className={`${styles.inWorkOrderList} ${styles.orderNumberList}`}
              >
                {inWorkOrderList!.map((order, idx) => {
                  return (
                    <li key={idx} className="text text_type_digits-default">
                      {order.number}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">{ordersData.total}</p>
            </div>
            <div>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">
                {ordersData.totalToday}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
