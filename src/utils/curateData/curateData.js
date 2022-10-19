const curateData = (model, item) => {
  const curatedItem = { ...item };

  Object.keys(model).forEach((key) => {
    if (!item[key]) curatedItem[key] = model[key];
  });
  return curatedItem;
};

export default curateData;
