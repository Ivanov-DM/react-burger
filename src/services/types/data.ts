export type TIngredientData = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
};

export type TUserResponseData = {
  email: string;
  name: string;
};

export type TUserRequestData = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
};

export type TRefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TCreateOrderResponse = {
  success: boolean;
  name: string;
  order: TOrderData;
};

export type TGetOrderResponse = {
  success: boolean;
  orders: ReadonlyArray<TOrderData>;
};

type TOrderOwnerData = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrderData = {
  ingredients: Array<string>;
  _id: string;
  owner: TOrderOwnerData;
  status: "created" | "done" | "pending";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price?: number;
  __v?: number;
};

export type TGetIngredientsResponse = {
  success: boolean;
  data: ReadonlyArray<TIngredientData>;
};

export type TAuthResponse = {
  success: boolean;
  user?: TUserResponseData;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type TGetOrdersResponse = {
  success: boolean;
  orders: Array<TOrderData>;
  total: number;
  totalToday: number;
};

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
