import React from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import {testData, testIngredientSet} from "../../utils/testData";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
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