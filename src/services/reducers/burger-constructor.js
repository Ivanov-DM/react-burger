import {
  ADD_INGREDIENT,
  ADD_PRICE,
  DEC_INGREDIENT_COUNT,
  DELETE_INGREDIENT,
  INC_INGREDIENT_COUNT,
  SUB_PRICE,
  UPDATE_INGREDIENTS_ORDER,
} from "../actions/burger-constructor";

const constructorInitialState = {
  burgerIngredients: {
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
        burgerIngredients: {
          ...state.burgerIngredients,
          bun:
            action.ingredient.type === "bun"
              ? [action.ingredient]
              : state.burgerIngredients.bun,
          fillings:
            action.ingredient.type !== "bun"
              ? [...state.burgerIngredients.fillings, action.ingredient]
              : state.burgerIngredients.fillings,
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: [
            ...state.burgerIngredients.fillings.filter(
              (_, index) => index !== action.index
            ),
          ],
        },
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
      const dragIngredient = state.burgerIngredients.fillings[action.dragIndex];
      const hoverIngredient =
        state.burgerIngredients.fillings[action.hoverIndex];
      state.burgerIngredients.fillings[action.dragIndex] = hoverIngredient;
      state.burgerIngredients.fillings[action.hoverIndex] = dragIngredient;
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
        },
      };
    }
    default:
      return state;
  }
}
