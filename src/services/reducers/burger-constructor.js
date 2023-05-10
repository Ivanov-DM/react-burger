import {
  ADD_INGREDIENT,
  ADD_PRICE,
  DEC_INGREDIENT_COUNT,
  DELETE_INGREDIENT,
  INC_INGREDIENT_COUNT,
  RESET_INGREDIENTS,
  SUB_PRICE,
  UPDATE_INGREDIENTS_ORDER,
} from "../actions/burger-constructor";

const constructorInitialState = {
  constructorIngredients: {
    bun: [],
    fillings: [],
  },
  ingredientsCount: {},
  totalPrice: 0,
};

export function burgerConstructorReducer(
  state = constructorInitialState,
  action
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
      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          [action.ingredientId]: state.ingredientsCount[action.ingredientId]
            ? ++state.ingredientsCount[action.ingredientId]
            : 1,
        },
      };
    }
    case DEC_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          [action.ingredientId]: --state.ingredientsCount[action.ingredientId],
        },
      };
    }
    case UPDATE_INGREDIENTS_ORDER: {
      const dragIngredient =
        state.constructorIngredients.fillings[action.dragIndex];
      const hoverIngredient =
        state.constructorIngredients.fillings[action.hoverIndex];
      state.constructorIngredients.fillings[action.dragIndex] = hoverIngredient;
      state.constructorIngredients.fillings[action.hoverIndex] = dragIngredient;
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
        },
      };
    }
    default:
      return state;
  }
}
