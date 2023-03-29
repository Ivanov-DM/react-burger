import React from "react";
import PropTypes from 'prop-types';
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";

const ingredientProptypes = PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v:PropTypes.number.isRequired
});

export default function BurgerConstructor(props) {
    const ingredientsSet = props.ingredientSet;
    const bun = ingredientsSet.find(ingredient => ingredient.type === 'bun');

    const renderBuns = (bunData, type, styleClass) => {
        return (
            <ConstructorElement
                type={type}
                isLocked={true}
                text={bunData.name}
                thumbnail={bunData.image}
                price={bunData.price}
                extraClass={styleClass}
            />
        )
    }

    const renderIngredient = (ingredientData) => {
        return (
            <ConstructorElement
                text={ingredientData.name}
                thumbnail={ingredientData.image}
                price={ingredientData.price}/>
        )
    }

    return (
        <section className={`${burgerConstructorStyle.container} pt-25 pl-4`}>
            <div className={`${burgerConstructorStyle.ingredient} pl-8 pr-4`}>
                {bun ? renderBuns(bun, "top") : null}
            </div>
                <ul className={`${burgerConstructorStyle.ingredient_list} mt-4 mb-4`}>
                    {
                        ingredientsSet.map((ingredient, idx) => {
                            if (ingredient.type !== 'bun') {
                                return (
                                    <li className={burgerConstructorStyle.ingredient} key={idx}>
                                        <span className={`${burgerConstructorStyle.ingredient_dragIcon} mr-2`}>
                                            <DragIcon type="primary"/>
                                        </span>
                                        {renderIngredient(ingredient)}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            <div className={`${burgerConstructorStyle.ingredient} ml-8 mr-4`}>
                {bun ? renderBuns(bun, "bottom") : null}
            </div>
            <div className={`${burgerConstructorStyle.burgerInfo} mt-10 pr-4`}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <span className={burgerConstructorStyle.burgerInfo_priceIcon}>
                        <CurrencyIcon type="primary"/>
                    </span>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-10">Оформить заказ</Button>
            </div>
        </section>
    )
};

BurgerConstructor.propTypes = {
    ingredientSet: PropTypes.arrayOf(ingredientProptypes.isRequired)
}