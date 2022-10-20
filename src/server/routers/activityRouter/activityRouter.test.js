import request from "supertest";
import codes from "../../../config/codes";
import endpoints from "../../../config/endpoints";
import app from "../../index.js";
import mockActivity from "../../../test-utils/mocks/mockActivity";
import { Activity } from "../../../database/runModels";

const { activities } = endpoints;

describe(`Given a ${activities.router}${activities.root} endpoint`, () => {
  describe("When requested with POST method", () => {
    describe("And the body has a valid activity", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        Activity.create = () => Promise.resolve(mockActivity);

        const res = await request(app)
          .post(`${activities.router}${activities.root}`)
          .send({
            name: mockActivity.name,
            description: mockActivity.description,
            center: mockActivity.center,
          });

        expect(res.statusCode).toBe(codes.created);
      });
    });

    describe("And the body doesn't have a valid activity", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        Activity.create = () => Promise.resolve(mockActivity);

        const res = await request(app)
          .post(`${activities.router}${activities.root}`)
          .send({});

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});
