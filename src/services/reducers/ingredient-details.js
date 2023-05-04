import {
  DELETE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

const detailsInitialState = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (
  state = detailsInitialState,
  action
) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredient,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
