import React, {useEffect, useReducer} from "react";
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext} from "../../services/appContext";
import {createOrder} from "../../utils/burger-api";

export default function BurgerConstructor() {
    const [modalWithOrderDetailsVisible, setModalWithOrderDetailsVisible] =
        React.useState(false);
    const [order, setOrder] = React.useState({number: 0});
    const {burgerIngredients} = React.useContext(IngredientsContext);

    const totalPriceInitialState = {price: 0};

    function reducer(state, action) {
        switch (action.type) {
            case 'addPrice' :
                return {price: state.price + action.payload};
            case 'subPrice' :
                return {price: state.price - action.payload};
            case 'reset' :
                return totalPriceInitialState;
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);

    const bun = burgerIngredients.find((ingredient) => ingredient.type === "bun");
    const sauceAndMain = burgerIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
    );

    const submitOrder = () => {
        const ingredientsId = burgerIngredients.map(ingredient => ingredient._id);
        createOrder(ingredientsId)
            .then(res => {
                if (res.success) {
                    setOrder({number: res.order.number});
                    setModalWithOrderDetailsVisible(true);
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (bun) {
            totalPriceDispatcher({type: 'addPrice', payload: bun.price * 2})
        }
        if (sauceAndMain) {
            const totalPriceSauceAndMain = sauceAndMain.reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
            totalPriceDispatcher({type: 'addPrice', payload: totalPriceSauceAndMain})
        }
    }, [burgerIngredients])

    return (
        <section className={`${burgerConstructorStyle.container} pt-25 pl-4`}>
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
                        <li className={burgerConstructorStyle.ingredient} key={idx}>
              <span
                  className={`${burgerConstructorStyle.ingredient_dragIcon} mr-2`}
              >
                <DragIcon type="primary"/>
              </span>
                            <ConstructorElement
                                text={ingredient.name}
                                thumbnail={ingredient.image}
                                price={ingredient.price}
                            />
                        </li>
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
                <p className="text text_type_digits-medium mr-2">{totalPriceState.price}</p>
                <span className={burgerConstructorStyle.burgerInfo_priceIcon}>
          <CurrencyIcon type="primary"/>
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
                {modalWithOrderDetailsVisible && (
                    <Modal
                        header=""
                        boxStyles="pt-15 pr-10 pb-30 pl-10"
                        setVisible={setModalWithOrderDetailsVisible}
                    >

                        <OrderDetails orderNumber={order.number}/>
                    </Modal>
                )}
            </div>
        </section>
    );
}