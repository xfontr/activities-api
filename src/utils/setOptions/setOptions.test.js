import { Activity } from "../../database/runModels";
import setOptions from "./setOptions";

describe("Given a setOptions function", () => {
  describe("When called with a model and a list of attributes, requesting a through attribute", () => {
    test("Then it should return an options object with said model and attributes", () => {
      const attributeOne = "Hello";
      const attributeTwo = "Bye";

      const expectedOptions = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Activity,
            attributes: [attributeOne, attributeTwo],
            through: {
              attributes: [],
            },
          },
        ],
      };

      const returnedOptions = setOptions(
        Activity,
        true,
        attributeOne,
        attributeTwo
      );

      expect(returnedOptions).toStrictEqual(expectedOptions);
    });
  });

  describe("When called with a model and a list of attributes, not requesting a through attribute", () => {
    test("Then it should return an options object with said model and attributes", () => {
      const attributeOne = "Hello";
      const attributeTwo = "Bye";

      const expectedOptions = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Activity,
            attributes: [attributeOne, attributeTwo],
          },
        ],
      };

      const returnedOptions = setOptions(
        Activity,
        false,
        attributeOne,
        attributeTwo
      );

      expect(returnedOptions).toStrictEqual(expectedOptions);
    });
  });
});
