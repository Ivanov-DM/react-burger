import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from "../constants/burger-ingredients";
import { TIngredientData } from "../types/data";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";

type TBurgerIngredientsState = {
  ingredients: ReadonlyArray<TIngredientData>;
  ingredientsRequest: boolean;
  ingredientsError: boolean;
};

let initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const burgerIngredientsReducer = (
  state: TBurgerIngredientsState = initialState,
  action: TBurgerIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsError: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredients: [],
        ingredientsError: true,
        ingredientsRequest: false,
      };
    }
    default:
      return state;
  }
};
