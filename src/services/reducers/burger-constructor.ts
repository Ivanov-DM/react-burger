import {
  ADD_INGREDIENT,
  ADD_PRICE,
  DEC_INGREDIENT_COUNT,
  DELETE_INGREDIENT,
  INC_INGREDIENT_COUNT,
  RESET_INGREDIENTS,
  SUB_PRICE,
  UPDATE_INGREDIENTS_ORDER,
} from "../constants/burger-constructor";
import {TBurgerConstructorActions} from "../actions/burger-constructor";
import {TIngredientData} from "../types/data";

export type TBurgerConstructorState = {
  constructorIngredients: {
    bun: ReadonlyArray<TIngredientData>;
    fillings: Array<TIngredientData>;
  };
  ingredientsCount: {
    [key: string]: number;
  };
  totalPrice: number;
}

const constructorInitialState: TBurgerConstructorState = {
  constructorIngredients: {
    bun: [],
    fillings: [],
  },
  ingredientsCount: {},
  totalPrice: 0,
};

export function burgerConstructorReducer(
  state = constructorInitialState,
  action: TBurgerConstructorActions
) {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: {
          bun:
              action.ingredient.type === "bun"
                  ? [action.ingredient]
                  : state.constructorIngredients.bun,
          fillings:
              action.ingredient.type !== "bun"
                  ? [...state.constructorIngredients.fillings, action.ingredient]
                  : state.constructorIngredients.fillings,
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          fillings: [
            ...state.constructorIngredients.fillings.filter(
              (_, index) => index !== action.index
            ),
          ],
        },
      };
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        ...constructorInitialState,
      };
    }
    case ADD_PRICE: {
      return {
        ...state,
        totalPrice: state.totalPrice + action.price,
      };
    }
    case SUB_PRICE: {
      return {
        ...state,
        totalPrice: state.totalPrice - action.price,
      };
    }
    case INC_INGREDIENT_COUNT: {
      if (state.ingredientsCount[action.ingredientId]) {
        return {
          ...state,
          ingredientsCount: {
            ...state.ingredientsCount,
            [action.ingredientId]: state.ingredientsCount[action.ingredientId] + 1,
          }
        }
      } else {
        return {
          ...state,
          ingredientsCount: {
            ...state.ingredientsCount,
            [action.ingredientId]: 1,
          }
        }
      }
    }
    case DEC_INGREDIENT_COUNT: {
      if (state.ingredientsCount[action.ingredientId]) {
        return {
          ...state,
          ingredientsCount: {
            ...state.ingredientsCount,
            [action.ingredientId]: state.ingredientsCount[action.ingredientId] - 1,
          }
        }
      } else {
        return {...state}
      }
    }
    case UPDATE_INGREDIENTS_ORDER: {
      const ingredients = [...state.constructorIngredients.fillings];
      ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          fillings: ingredients
        }
      }
    }
    default:
      return state;
  }
}