import React from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import {data} from "../../utils/data";

export default class App extends React.Component {
    render() {
        return (
            <div className="page">
                <AppHeader />
                <main>
                    <BurgerIngredients ingredients={data} />
                </main>
            </div>
        )
    }
};