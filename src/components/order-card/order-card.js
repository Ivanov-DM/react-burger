import styles from "./order-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {
    calculateTotalPrice,
    getIngredientsWithCount,
    getIngredientIcons,
    getTimeZone,
    getFormattedDate
} from "../../utils/order";
import {ORDER_STATUS} from "../../utils/constants";
import {ingredientProptypes, orderProptypes} from "../../utils/prop-types";
import PropTypes from "prop-types";

export const OrderCard = ({orderData, ingredients}) => {
    const location = useLocation();
    const ingredientsWithCount = getIngredientsWithCount(orderData, ingredients);
    const ingredientsIcons = getIngredientIcons(ingredientsWithCount, 6);
    const timeZone = getTimeZone(orderData.updatedAt);
    const formattedDate = getFormattedDate(orderData.updatedAt);
    const totalPrice = calculateTotalPrice(ingredientsWithCount);

    return (
        <Link
            key={orderData.number}
            to={`${orderData.number}`}
            state={{background: location}}
            className={styles.link}
        >
            <div className={styles.container}>
                <div className={styles.orderIdAndTimestamp}>
                    <h2 className="text text_type_digits-default mb-6">
                        &#35;{orderData.number}
                    </h2>
                    <p className="text text_type_main-small text_color_inactive">
                        {formattedDate} i-{timeZone}
                    </p>
                </div>
                <p className="text text_type_main-medium mb-2">{orderData.name}</p>
                <p className={
                    `text text_type_main-default mb-6 ${orderData.status === 'done'
                        ? ORDER_STATUS.done.textColor
                        : ""}`
                }>
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
                                        {
                                            idx === 0 && ingredientsIcons.moreCount
                                                ? (
                                                    <div
                                                        className={`text text text_type_digits-default ${styles.moreCounter}`}>
                                                        +{ingredientsIcons.moreCount}
                                                    </div>
                                                )
                                                : null
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default pr-2">{totalPrice}</p>
                        <span className={styles.priceIcon}>
                    <CurrencyIcon type="primary"/>
                </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

OrderCard.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientProptypes.isRequired).isRequired,
    orderData: orderProptypes.isRequired
};