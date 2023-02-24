import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { create_user } from "../factories/auth-factories";
import app from "app";
import { generateValidCredential } from "../factories/credential-factories";

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

const server = supertest(app);

describe("POST /credentials route", () => {
    jest.setTimeout(50000);
    it("No token is provided, response -> 401", async () => {
        const response = await server.post("/credentials")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "12345678"
        const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        
          const ValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(10),
          });
        it("Valid token is passed and but no body and response -> 401", async () => {
            const user = await ValidBody()
            const token = await generateValidToken(user)
            const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        it("Valid token is passed, but no wrong body format, response 403", async () => {
            const user = await ValidBody()
            const body = {
                tle:faker.name.firstName(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.url(),
              }
            const token = await generateValidToken(user)
            const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(body);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });

        it("Credential with the same name", async () => {
            const userBody = ValidBody()
            const user = await create_user(userBody)
            const credential = await generateValidCredential(user.id)
            
            const token = await generateValidToken({id: String(user.id),email: user.email, password: userBody.password})
            const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send({title: credential.title, url: credential.url, username: credential.username, password: credential.password});
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
    });
});


describe("GET /credentials/:id testing", () => {
    jest.setTimeout(50000);
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/credentials/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "1234567"
        const response = await server.get("/credentials/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Right token is provided", () => {
        
        
    });
});

describe("DELETE /credentials/:id testing", () => {
    jest.setTimeout(50000);
    const generateCredential = () => ({
        title:faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      });
      const ValidBody = () => ({
        id: faker.random.numeric(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.delete("/credentials/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "12345678"
        const response = await server.delete("/credentials/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        it("Not a valid id passed", async () => {
            const user = ValidBody()
            const body = generateCredential();
            const token = await generateValidToken(user)
            const randoNumber = faker.random.numeric(3)
            const response = await server.delete(`/credentials/${randoNumber}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        it("Valid id is passed", async () => {
            const body = await generateCredential();
            const userBody = ValidBody()
            const user = await create_user(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            const credential = await generateValidCredential(Number(user.id))

            const response = await server.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.ACCEPTED)
        });
    });
});