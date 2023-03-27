import React, {useState} from "react";
import {
    Counter,
    Tab,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from "./burger-ingredients.module.css";

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('buns');
    const ingredients = props.ingredients;
    return (
        <section className={burgerIngredientsStyle.container}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="filling" active={current === 'filling'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={burgerIngredientsStyle.ingredientTypeList}>
                <li>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
                    <ul className={burgerIngredientsStyle.ingredients}>
                        {
                            ingredients.map((ingredient, idx) => {
                                if (ingredient.type === 'bun') {
                                    return (
                                        <li className={burgerIngredientsStyle.ingredient} key={idx}>
                                            <img className={burgerIngredientsStyle.ingredient_image} src={ingredient.image}/>
                                            <Counter className={burgerIngredientsStyle.counter}  count={1} size="default"/>
                                            <p className={`${burgerIngredientsStyle.ingredient_price} text text_type_digits-default mr-2`} >{ingredient.price}</p>
                                            <div className={burgerIngredientsStyle.ingredient_priceIcon}>
                                                <CurrencyIcon  />
                                            </div>
                                            <h3 className={`${burgerIngredientsStyle.ingredient_name} text text_type_main-default`}>{ingredient.name}</h3>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>

                </li>
                <li>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
                    <ul className={burgerIngredientsStyle.ingredients}>
                        {
                            ingredients.map((ingredient, idx) => {
                                if (ingredient.type === 'sauce') {
                                    return (
                                        <li className={burgerIngredientsStyle.ingredient} key={idx}>
                                            <img className={burgerIngredientsStyle.ingredient_image} src={ingredient.image}/>
                                            <p className={`${burgerIngredientsStyle.ingredient_price} text text_type_digits-default mr-2`}>{ingredient.price}</p>
                                            <div className={burgerIngredientsStyle.ingredient_priceIcon}>
                                                <CurrencyIcon />
                                            </div>
                                            <h3 className={`${burgerIngredientsStyle.ingredient_name} text text_type_main-default`}>{ingredient.name}</h3>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </li>
                <li>
                    <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
                    <ul className={burgerIngredientsStyle.ingredients}>
                        {
                            ingredients.map((ingredient, idx) => {
                                if (ingredient.type === 'main') {
                                    return (
                                        <li className={burgerIngredientsStyle.ingredient} key={idx}>
                                            <img className={burgerIngredientsStyle.ingredient_image} src={ingredient.image}/>
                                            <p className={`${burgerIngredientsStyle.ingredient_price} text text_type_digits-default mr-2`} >{ingredient.price}</p>
                                            <div className={burgerIngredientsStyle.ingredient_priceIcon}>
                                                <CurrencyIcon  />
                                            </div>
                                            <h3 className={`${burgerIngredientsStyle.ingredient_name} text text_type_main-default`}>{ingredient.name}</h3>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>

                </li>
            </ul>
        </section>
    )
}