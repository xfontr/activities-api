import request from "supertest";
import codes from "../../../config/codes";
import endpoints from "../../../config/endpoints";
import app from "../../index.js";
import mockSportsCenter from "../../../test-utils/mocks/mockSportsCenter";
import { SportsCenter, User } from "../../../database/runModels";
import mockUser, { mockProtoUser } from "../../../test-utils/mocks/mockUser";

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
        const res = await request(app)
          .post(`${sportCenters.router}${sportCenters.root}`)
          .send({});

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});

describe(`Given a ${sportCenters.router}${sportCenters.root} endpoint`, () => {
  describe("When requested with PATCH method", () => {
    describe("And the request has a center ID and at the body a user", () => {
      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        SportsCenter.findByPk = () =>
          Promise.resolve({ ...mockSportsCenter, save: jest.fn() });
        User.create = () => Promise.resolve(mockUser);

        const res = await request(app)
          .patch(`${sportCenters.router}${sportCenters.root}?centerId=1`)
          .send({ ...mockProtoUser });

        expect(res.statusCode).toBe(codes.ok);
      });
    });

    describe("And the request has a center ID and at the body a user id", () => {
      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        SportsCenter.findByPk = () =>
          Promise.resolve({ ...mockSportsCenter, save: jest.fn() });
        User.findByPk = () => Promise.resolve(mockUser);

        const res = await request(app)
          .patch(`${sportCenters.router}${sportCenters.root}?centerId=1`)
          .send({ id: 4 });

        expect(res.statusCode).toBe(codes.ok);
      });
    });

    describe("And the request has a non-existant center ID", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        SportsCenter.findByPk = () => Promise.resolve({});

        const res = await request(app)
          .patch(`${sportCenters.router}${sportCenters.root}?centerId=falseid`)
          .send({ id: 0 });

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});

describe(`Given a ${sportCenters.router}${sportCenters.root} endpoint`, () => {
  describe("When requested with GET method", () => {
    test(`Then it should respond with a status of ${codes.ok}`, async () => {
      SportsCenter.findAll = () => Promise.resolve([mockSportsCenter]);

      const res = await request(app).get(
        `${sportCenters.router}${sportCenters.root}`
      );

      expect(res.statusCode).toBe(codes.ok);
    });
  });
});
