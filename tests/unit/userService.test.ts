
import { UserRegister } from "../../services/UserServices";
import sendVerificationEmail from "../../helpers/sendVerificationEmail";

jest.mock("../../helpers/sendVerificationEmail");

describe("UserRegister", () => {
  test("TC1 - Email manquant", async () => {
    await expect(
      // @ts-expect-error: test volontaire avec champ manquant
      UserRegister({ password: "Test21234!", firstName: "John", lastName: "Doe" })
    ).rejects.toThrow("Champ(s) manquant(s)");
  });

  test("TC2 - Mot de passe faible", async () => {
    await expect(
      UserRegister({
        email: "weak1@example.com",
        password: "123",
        firstName: "John",
        lastName: "Doe",
      })
    ).rejects.toThrow("Mot de passe trop faible");
  });

  test("TC3 - Succès", async () => {
    const user = await UserRegister({
      email: "success@example.com",
      password: "Test1234!",
      firstName: "Jane",
      lastName: "Doe",
    });

    expect(user.email).toBe("success@example.com");
    expect(sendVerificationEmail).toHaveBeenCalledWith("success@example.com", expect.any(String));
  });
});
