const setOptions = (model, through, ...attributes) => {
  const options = {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model,
        attributes,
      },
    ],
  };

  if (through) options.include[0].through.attributes = [];

  return options;
};

export default setOptions;
