import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const getIngredientsWithCount = (orderData, ingredients) => {
    return orderData.ingredients.reduce((result, currentId) => {
        if (!result[currentId]) {
            result[currentId] = {
                count: 1,
                ingredient: ingredients.find(item => item._id === currentId)}
        } else {
            result[currentId] = {...result[currentId], count: result[currentId].count + 1}
        }
        return result
    }, {});
}

export const calculateTotalPrice = (ingredientsData) => {
    let totalSum = 0;
    for (let key in ingredientsData) {
        totalSum = totalSum + ingredientsData[key].count * ingredientsData[key].ingredient.price;
    }
    return totalSum
}

export const getIngredientIcons = (ingredientData, limit) => {
    let ingredientIconsData = {
        iconsSrc: [],
        moreCount: 0
    };
    for (let key in ingredientData) {
        ingredientIconsData.iconsSrc.push(ingredientData[key].ingredient.image);
    }
    if (ingredientIconsData.iconsSrc.length > limit) {
        ingredientIconsData.moreCount = ingredientIconsData.iconsSrc.length - limit;
        ingredientIconsData.iconsSrc = ingredientIconsData.iconsSrc.slice(0, limit).reverse();
    }
    return ingredientIconsData;
}

export const getFormattedDate = (dateFromServer) => {
    return <FormattedDate date={new Date(dateFromServer)} />
}

export const getTimeZone = (dateFromServer) => {
    let timeZone = '';
    const timeData = new Date(dateFromServer).toTimeString().split(' ');
    timeData.forEach(el => {
        if (el.includes('GMT')) {
            timeZone = el.replaceAll('0', '');
        }
    })
    return timeZone;
}