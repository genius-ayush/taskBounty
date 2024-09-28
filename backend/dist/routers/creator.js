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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const config_1 = require("../config");
const middleware_1 = require("../middleware");
const prismaClient = new client_1.PrismaClient();
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const existingUser = yield prismaClient.user.findFirst({
        where: {
            email: email,
        },
    });
    if (existingUser) {
        res.status(403).json({ message: "User already exist" });
    }
    else {
        const user = yield prismaClient.user.create({
            data: {
                username: username,
                email: email,
                passwordHash: password,
                role: "CREATOR",
            },
        });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, config_1.JWT_SECRET_CREATOR);
        res.json({
            token,
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prismaClient.user.findFirst({
        where: {
            email: email,
            passwordHash: password,
            role: "CREATOR",
        },
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, config_1.JWT_SECRET_CREATOR);
        res.json({
            token,
        });
    }
    else {
        res.status(401).json("wrong username or password");
    }
}));
router.get("/me", middleware_1.authenticateJwtCreator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    const user = yield prismaClient.user.findFirst({
        where: {
            id: userId === null || userId === void 0 ? void 0 : userId.toString(),
        },
    });
    if (user) {
        res.json({ username: user.username, role: user.role });
    }
    else {
        res.status(403).json({ message: "user not loged in" });
    }
}));
router.post("/createSurvey", middleware_1.authenticateJwtCreator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    try {
        const { title, description, totalQuestions, pointsPerCompletion, amountDeposited, questions, } = req.body;
        console.log(questions);
        let response = yield prismaClient.survey.create({
            data: {
                //@ts-ignore
                creatorId: userId,
                title,
                description,
                totalQuestions,
                pointsPerCompletion,
                amountDeopsited: amountDeposited,
                questions: {
                    //@ts-ignore
                    create: questions.map((question) => ({
                        questionText: question.questionText,
                        choices: {
                            //@ts-ignore
                            create: question.choices.map((choice) => ({
                                choiceText: choice,
                            })),
                        },
                    })),
                },
            },
        });
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to create survey" });
    }
}));
router.get("/getSurvey", middleware_1.authenticateJwtCreator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.headers.userId ;
    try {
        const surveys = yield prismaClient.survey.findMany({
            include: {
                creator: true,
                questions: true,
                responses: true,
            },
        });
        res.json(surveys);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch surveys" });
    }
}));
router.get("/getSurvey/:id", middleware_1.authenticateJwtCreator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const survey = yield prismaClient.survey.findUnique({
            where: { id },
            include: {
                creator: true,
            },
        });
        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }
        res.json(survey);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to fetch survey" });
    }
}));
exports.default = router;
