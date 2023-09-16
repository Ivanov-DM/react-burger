import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { rootReducer } from "../reducers";
import { TOrderActions } from "../actions/order";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TAuthActions } from "../actions/auth";
import { TFeedOrdersActions } from "../actions/feed-orders";
import { TProfileOrdersActions } from "../actions/profile-orders";
import type {} from "redux-thunk/extend-redux";

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TOrderActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TAuthActions
  | TFeedOrdersActions
  | TProfileOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;
