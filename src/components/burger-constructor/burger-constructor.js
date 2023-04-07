import React from "react";
import PropTypes from 'prop-types';
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {ingredientProptypes} from "../../utils/prop-types";

export default function BurgerConstructor(props) {
    const ingredientsSet = props.ingredientSet;
    const bun = ingredientsSet.find(ingredient => ingredient.type === 'bun');
    const sauceAndMain = ingredientsSet.filter(ingredient => ingredient.type !== 'bun');

    return (
        <section className={`${burgerConstructorStyle.container} pt-25 pl-4`}>
            <div className={`${burgerConstructorStyle.ingredient} pl-8 pr-4`}>
                {
                    bun
                        ? <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            thumbnail={bun.image}
                            price={bun.price}
                        />
                        : null
                }
            </div>
            <ul className={`${burgerConstructorStyle.ingredient_list} mt-4 mb-4`}>
                {
                    sauceAndMain.map((ingredient, idx) => {
                        return (
                            <li className={burgerConstructorStyle.ingredient} key={idx}>
                                <span className={`${burgerConstructorStyle.ingredient_dragIcon} mr-2`}>
                                    <DragIcon type="primary"/>
                                </span>
                                <ConstructorElement
                                    text={ingredient.name}
                                    thumbnail={ingredient.image}
                                    price={ingredient.price}
                                />
                            </li>
                        )
                    })
                }
            </ul>
            <div className={`${burgerConstructorStyle.ingredient} ml-8 mr-4`}>
                {
                    bun
                        ? <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name}
                            thumbnail={bun.image}
                            price={bun.price}
                        />
                        : null
                }
            </div>
            <div className={`${burgerConstructorStyle.burgerInfo} mt-10 pr-4`}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <span className={burgerConstructorStyle.burgerInfo_priceIcon}>
                        <CurrencyIcon type="primary"/>
                    </span>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    extraClass="ml-10"
                    onClick={() => props.setVisible(true)}
                >Оформить заказ</Button>
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    ingredientSet: PropTypes.arrayOf(ingredientProptypes.isRequired).isRequired
}