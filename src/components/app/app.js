import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {testData, testIngredientSet} from "../../utils/testData";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";

export default class App extends React.Component {
    render() {
        return (
            <div className="page">
                <AppHeader />
                <main className={appStyles.main_content}>
                    <BurgerIngredients ingredients={testData} />
                    <BurgerConstructor ingredientSet={testIngredientSet} />
                </main>
            </div>
        )
    }
};