import {
    ADD_INGREDIENT,
    ADD_PRICE,
    DEC_INGREDIENT_COUNT,
    DELETE_INGREDIENT,
    INC_INGREDIENT_COUNT,
    RESET_INGREDIENTS,
    SUB_PRICE,
    UPDATE_INGREDIENTS_ORDER
} from "../constants/burger-constructor";
import {TIngredientData} from "../types/data";
import {v4 as uuidv4} from "uuid";

interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    ingredient: TIngredientData;
}

interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    index: number;
}

interface IResetIngredientsAction {
    readonly type: typeof RESET_INGREDIENTS
}

interface ISubPriceAction {
    readonly type: typeof SUB_PRICE;
    price: number;
}

interface IAddPriceAction {
    readonly type: typeof ADD_PRICE
    price: number;
}

interface IIncIngredientAction {
    readonly type: typeof INC_INGREDIENT_COUNT;
    ingredientId: string;
}

interface IDecIngredientAction {
    readonly type: typeof DEC_INGREDIENT_COUNT;
    ingredientId: string;
}

interface IUpdateIngredientsAction {
    readonly type: typeof UPDATE_INGREDIENTS_ORDER;
    dragIndex: number;
    hoverIndex: number;
}

export const addIngredientAction = (ingredient: TIngredientData): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    ingredient: {
        ...ingredient,
        uuid: uuidv4(),
    }
});

export const deleteIngredientAction = (index: number): IDeleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    index
});

export const resetIngredientAction = (): IResetIngredientsAction => ({
    type: RESET_INGREDIENTS
});

export const subPriceAction = (price: number): ISubPriceAction => ({
    type: SUB_PRICE,
    price
});

export const addPriceAction = (price: number): IAddPriceAction => ({
    type: ADD_PRICE,
    price
});

export const incIngredientAction = (ingredientId: string): IIncIngredientAction => ({
    type: INC_INGREDIENT_COUNT,
    ingredientId
});

export const decIngredientAction = (ingredientId: string): IDecIngredientAction => ({
    type: DEC_INGREDIENT_COUNT,
    ingredientId
});

export const updateIngredientsAction = (dragIndex: number, hoverIndex: number): IUpdateIngredientsAction => ({
    type: UPDATE_INGREDIENTS_ORDER,
    dragIndex,
    hoverIndex,
});

export type TBurgerConstructorActions =
    IAddIngredientAction
    | IDeleteIngredientAction
    | IResetIngredientsAction
    | ISubPriceAction
    | IAddPriceAction
    | IIncIngredientAction
    | IDecIngredientAction
    | IUpdateIngredientsAction;