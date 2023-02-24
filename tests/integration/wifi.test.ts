import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import app from "app";

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

const server = supertest(app);

describe("GET /wifi/:id testing", () => {
    jest.setTimeout(50000);
   
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/wifi/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.get("/wifi/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    
});

describe("DELETE /wifi/:id testing", () => {
    jest.setTimeout(50000);
    const generateCredential = () => ({
        title:faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      });
      const generateValidBody = () => ({
        id: faker.random.numeric(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.delete("/wifi/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.delete("/wifi/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        it("Not a valid id passed", async () => {
            const user = generateValidBody()
            const body = generateCredential();
            const token = await generateValidToken(user)
            const randoNumber = faker.random.numeric(3)
            const response = await server.delete(`/wifi/${randoNumber}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        
    });
});