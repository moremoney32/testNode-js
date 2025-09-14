"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const sendVerificationEmail_1 = __importDefault(require("../../helpers/sendVerificationEmail"));
jest.mock("../../helpers/sendVerificationEmail");
describe("POST /api/register", () => {
    test("TC1 - Inscription réussie", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/register").send({
            email: "user@example.com",
            password: "Test21234!",
            firstName: "John",
            lastName: "Doe",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Inscription réussie");
        expect(sendVerificationEmail_1.default).toHaveBeenCalled();
    }));
    test("TC2 - Email manquant", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/register").send({
            password: "Test21234!",
            firstName: "John",
            lastName: "Doe",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Champ(s) manquant(s)");
    }));
    test("TC3 - Email déjà utilisé", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/api/register").send({
            email: "user@example.com",
            password: "Test21234!",
            firstName: "John",
            lastName: "Doe",
        });
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/register").send({
            email: "user@example.com",
            password: "Test21234!",
            firstName: "John",
            lastName: "Doe",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe("Cette adresse e-mail est déjà utilisée");
    }));
});
