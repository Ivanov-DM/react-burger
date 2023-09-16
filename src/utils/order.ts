import { TIngredientData, TOrderData } from "../services/types/data";

export type TIngredientsWithCountObj = {
  count: number;
  ingredient: TIngredientData;
};

type TIngredientsWithCount = {
  [key: string]: TIngredientsWithCountObj;
};

type TIngredientIconsData = {
  iconsSrc: Array<string>;
  moreCount: number;
};

export const getIngredientsWithCount = (
  orderData: TOrderData,
  ingredients: ReadonlyArray<TIngredientData>
): TIngredientsWithCount => {
  return orderData.ingredients.reduce((result, currentIngredientId) => {
    if (!result[currentIngredientId]) {
      result[currentIngredientId] = {
        count: 1,
        ingredient: ingredients.find(
          (item) => item._id === currentIngredientId
        ) as TIngredientData,
      };
    } else {
      result[currentIngredientId] = {
        ...result[currentIngredientId],
        count: result[currentIngredientId].count + 1,
      };
    }
    return result;
  }, {} as TIngredientsWithCount);
};

export const calculateTotalPrice = (ingredientsData: TIngredientsWithCount) => {
  let totalSum = 0;
  for (let key in ingredientsData) {
    totalSum =
      totalSum +
      ingredientsData[key].count * ingredientsData[key].ingredient.price;
  }
  return totalSum;
};

export const getIngredientIcons = (
  ingredientData: TIngredientsWithCount,
  limit: number
) => {
  let ingredientIconsData: TIngredientIconsData = {
    iconsSrc: [],
    moreCount: 0,
  };
  for (let key in ingredientData) {
    ingredientIconsData.iconsSrc.push(ingredientData[key].ingredient.image);
  }
  if (ingredientIconsData.iconsSrc.length > limit) {
    ingredientIconsData.moreCount = ingredientIconsData.iconsSrc.length - limit;
    ingredientIconsData.iconsSrc = ingredientIconsData.iconsSrc
      .slice(0, limit)
      .reverse();
  }
  return ingredientIconsData;
};

export const getTimeZone = (dateFromServer: string) => {
  const timeZoneOffset = new Date(dateFromServer).getTimezoneOffset() / 60;
  return timeZoneOffset > 0
    ? `GMT-${Math.abs(timeZoneOffset)}`
    : `GMT+${Math.abs(timeZoneOffset)}`;
};
