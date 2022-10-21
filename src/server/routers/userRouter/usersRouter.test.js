import request from "supertest";
import codes from "../../../config/codes";
import endpoints from "../../../config/endpoints";
import app from "../../index.js";
import mockUser, { mockProtoUser } from "../../../test-utils/mocks/mockUser";
import mockActivity from "../../../test-utils/mocks/mockActivity";
import { Activity, User } from "../../../database/runModels";

const { users } = endpoints;

describe(`Given a ${users.router}${users.root} endpoint`, () => {
  describe("When requested with POST method", () => {
    describe("And the body has a valid user", () => {
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

describe(`Given a ${users.router}${users.user} endpoint`, () => {
  describe("When requested with PATCH method", () => {
    describe("And the request has a valid user and activity", () => {
      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        User.findByPk = () => ({ ...mockUser, addActivity: jest.fn() });
        Activity.findByPk = () => mockActivity;

        const res = await request(app).patch(
          `${users.router}${users.root}1/?activityId=1`
        );

        expect(res.statusCode).toBe(codes.ok);
      });
    });

    describe("And the request doesn't have a valid user", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        User.findByPk = () => null;
        Activity.findByPk = () => null;

        const res = await request(app).patch(
          `${users.router}${users.root}1/?activityId=1`
        );

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});

describe(`Given a ${users.router}${users.root} endpoint`, () => {
  describe("When requested with GET method", () => {
    describe("And the database has users to retrieve", () => {
      test(`Then it should respond with a status of ${codes.ok}`, async () => {
        User.findAll = () => Promise.resolve([{ ...mockUser }]);

        const res = await request(app).get(`${users.router}${users.root}`);

        expect(res.statusCode).toBe(codes.ok);
      });
    });

    describe("And the database responds with an error", () => {
      test(`Then it should respond with a status of ${codes.badRequest}`, async () => {
        User.findAll = () => Promise.reject(new Error());

        const res = await request(app).get(`${users.router}${users.root}`);

        expect(res.statusCode).toBe(codes.badRequest);
      });
    });
  });
});
