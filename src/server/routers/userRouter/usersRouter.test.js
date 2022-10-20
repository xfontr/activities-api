import request from "supertest";
import codes from "../../../config/codes";
import endpoints from "../../../config/endpoints";
import app from "../../index.js";
import mockUser, { mockProtoUser } from "../../../test-utils/mocks/mockUser";
import { User } from "../../../database/runModels";

const { users } = endpoints;

describe(`Given a ${users.router}${users.root} endpoint`, () => {
  describe("When requested with POST method", () => {
    describe("And the body has a valid activity", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        User.create = () => Promise.resolve(mockUser);

        const res = await request(app)
          .post(`${users.router}${users.root}`)
          .send({ ...mockProtoUser });

        expect(res.statusCode).toBe(codes.created);
      });
    });

    describe("And the body doesn't have a valid user", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        User.create = () => Promise.resolve({});

        const res = await request(app)
          .post(`${users.router}${users.root}`)
          .send({});

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});
