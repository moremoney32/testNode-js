
import request from "supertest";
import app from "../../app";
import sendVerificationEmail from "../../helpers/sendVerificationEmail";

jest.mock("../../helpers/sendVerificationEmail");

describe("POST /api/register", () => {
  test("TC1 - Inscription réussie", async () => {
    const res = await request(app).post("/api/register").send({
      email: "user@example.com",
      password: "Test21234!",
      firstName: "John",
      lastName: "Doe",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Inscription réussie");
    expect(sendVerificationEmail).toHaveBeenCalled();
  });

  test("TC2 - Email manquant", async () => {
    const res = await request(app).post("/api/register").send({
      password: "Test21234!",
      firstName: "John",
      lastName: "Doe",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Champ(s) manquant(s)");
  });

  test("TC3 - Email déjà utilisé", async () => {
    await request(app).post("/api/register").send({
      email: "user@example.com",
      password: "Test21234!",
      firstName: "John",
      lastName: "Doe",
    });

    const res = await request(app).post("/api/register").send({
      email: "user@example.com",
      password: "Test21234!",
      firstName: "John",
      lastName: "Doe",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe("Cette adresse e-mail est déjà utilisée");
  });
});
