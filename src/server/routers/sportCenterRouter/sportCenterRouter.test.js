import request from "supertest";
import codes from "../../../config/codes";
import endpoints from "../../../config/endpoints";
import app from "../../index.js";
import mockSportsCenter from "../../../test-utils/mocks/mockSportsCenter";
import { SportsCenter } from "../../../database/runModels";

const { sportCenters } = endpoints;

describe(`Given a ${sportCenters.router}${sportCenters.root} endpoint`, () => {
  describe("When requested with POST method", () => {
    describe("And the body has a valid sports center", () => {
      test(`Then it should respond with a status of ${codes.created}`, async () => {
        SportsCenter.create = () => Promise.resolve(mockSportsCenter);

        const res = await request(app)
          .post(`${sportCenters.router}${sportCenters.root}`)
          .send({ ...mockSportsCenter });

        expect(res.statusCode).toBe(codes.created);
      });
    });

    describe("And the body doesn't have a valid sports center", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        SportsCenter.create = () => Promise.resolve({});

        const res = await request(app)
          .post(`${sportCenters.router}${sportCenters.root}`)
          .send({});

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});
