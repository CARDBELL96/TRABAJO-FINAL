import request from "supertest";
import app from "../src/app.js";

describe("Health API", () => {

    test("GET / debe responder correctamente", async () => {

        const response = await request(app).get("/");

        expect(response.status).toBe(200);

        expect(response.text).toBe("TaskFlow API is running!");

    });

});