import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyles from "./burger-ingredient.module.css";
import {ingredientProptypes} from "../../utils/prop-types";

export default function BurgerIngredient(props) {
    const ingredient = props.ingredient;
    return (
        <>
            <img className={burgerIngredientStyles.image} src={ingredient.image}/>
            <Counter className={burgerIngredientStyles.counter}  count={1} size="default"/>
            <p className={`${burgerIngredientStyles.price} text text_type_digits-default mr-2`} >{ingredient.price}</p>
            <div className={burgerIngredientStyles.priceIcon}>
                <CurrencyIcon  />
            </div>
            <h3 className={`${burgerIngredientStyles.name} text text_type_main-default`}>{ingredient.name}</h3>
        </>
    )
}

BurgerIngredient.propTypes = {
    ingredient: ingredientProptypes.isRequired
}