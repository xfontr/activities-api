import { emptyUserModel } from "../../data/emptyModels.js";
import curateData from "./curateData.js";
import mockUser from "../../test-utils/mocks/mockUser.js";

describe("Given a curateData function", () => {
  describe("When called with an empty User model and an incomplete user", () => {
    test("Then it should return a full user object with default values where it was not completed", () => {
      const incompleteUser = {
        name: mockUser.name,
        firstSurname: mockUser.firstSurname,
        secondSurname: mockUser.secondSurname,
      };

      const expectedUser = {
        ...emptyUserModel,
        name: incompleteUser.name,
        firstSurname: incompleteUser.firstSurname,
        secondSurname: incompleteUser.secondSurname,
      };

      const result = curateData(emptyUserModel, incompleteUser);

      expect(result).toStrictEqual(expectedUser);
    });
  });
});
