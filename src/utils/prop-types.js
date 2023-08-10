import PropTypes, { string } from "prop-types";

export const ingredientProptypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const orderProptypes = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});
