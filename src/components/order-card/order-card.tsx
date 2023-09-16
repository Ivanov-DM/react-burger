import styles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  calculateTotalPrice,
  getIngredientsWithCount,
  getIngredientIcons,
  getTimeZone,
} from "../../utils/order";
import { ORDER_STATUS } from "../../utils/constants";
import { TIngredientData, TOrderData } from "../../services/types/data";

interface IOrderCardProps {
  orderData: TOrderData;
  ingredients: ReadonlyArray<TIngredientData>;
}

export const OrderCard = ({ orderData, ingredients }: IOrderCardProps) => {
  const location = useLocation();
  const ingredientsWithCount = getIngredientsWithCount(orderData, ingredients);
  const ingredientsIcons = getIngredientIcons(ingredientsWithCount, 6);
  const timeZone = getTimeZone(orderData.updatedAt);
  const totalPrice = calculateTotalPrice(ingredientsWithCount);

  return (
    <Link
      to={`${orderData.number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.container}>
        <div className={styles.orderIdAndTimestamp}>
          <h2 className="text text_type_digits-default mb-6">
            &#35;{orderData.number}
          </h2>
          <p className="text text_type_main-small text_color_inactive">
            <FormattedDate date={new Date(orderData.updatedAt)} /> i-{timeZone}
          </p>
        </div>
        <p className="text text_type_main-medium mb-2">{orderData.name}</p>
        <p
          className={`text text_type_main-default mb-6 ${
            orderData.status === "done" ? ORDER_STATUS.done.textColor : ""
          }`}
        >
          {ORDER_STATUS[orderData.status].title}
        </p>
        <div className={styles.ingredientsAndPrice}>
          <ul className={styles.ingredients}>
            {ingredientsIcons.iconsSrc.map((srcImage, idx) => {
              return (
                <li className={styles.ingredient} key={idx}>
                  <div className={styles.imageBorder}>
                    <img
                      src={srcImage}
                      className={styles.ingredientPreview}
                      alt="icon"
                    />
                    {idx === 0 && ingredientsIcons.moreCount ? (
                      <div
                        className={`text text text_type_digits-default ${styles.moreCounter}`}
                      >
                        +{ingredientsIcons.moreCount}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default pr-2">{totalPrice}</p>
            <span className={styles.priceIcon}>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
