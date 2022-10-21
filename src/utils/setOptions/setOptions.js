const setOptions = (model, ...attributes) => ({
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
  include: [
    {
      model,
      attributes,
      through: {
        attributes: [],
      },
    },
  ],
});

export default setOptions;
