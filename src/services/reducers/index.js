import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { feedOrdersReducer } from "./feed-orders";
import { profileOrdersReducer } from "./profile-orders";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  constructorIngredients: burgerConstructorReducer,
  orderData: orderReducer,
  userData: authReducer,
  feedOrders: feedOrdersReducer,
  profileOrders: profileOrdersReducer,
});
