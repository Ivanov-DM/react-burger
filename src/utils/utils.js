export const getClasses = (obj) => {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .join(" ");
};
