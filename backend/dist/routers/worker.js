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
            email: email
        }
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
                role: 'WORKER'
            },
        });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id
        }, config_1.JWT_SECRET_WORKER);
        res.json({
            token
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prismaClient.user.findFirst({
        where: {
            email: email,
            passwordHash: password,
            role: "WORKER"
        }
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user.id
        }, config_1.JWT_SECRET_WORKER);
        res.json({
            token
        });
    }
    else {
        res.status(401).json("wrong username or password");
    }
}));
router.get("/me", middleware_1.authenticateJwtWorker, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userId;
    const user = yield prismaClient.user.findFirst({
        where: {
            id: userId === null || userId === void 0 ? void 0 : userId.toString()
        }
    });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: "user not loged in" });
    }
}));
router.get("/getSurvey", middleware_1.authenticateJwtWorker, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const surveys = yield prismaClient.survey.findMany({
            include: {
                creator: true,
                questions: {
                    include: {
                        choices: true,
                    },
                },
                responses: true,
            },
        });
        res.json(surveys);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch surveys for worker' });
    }
}));
router.get("/getSurvey/:id", middleware_1.authenticateJwtWorker, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.headers.userId;
    try {
        const survey = yield prismaClient.survey.findUnique({
            where: { id },
            include: {
                creator: true,
                questions: {
                    include: {
                        choices: true,
                    }
                },
                responses: {
                    where: {
                        //@ts-ignore
                        workerId: userId
                    }
                }
            }
        });
        if (!survey) {
            return res.status(404).json({ error: "survey not found" });
        }
        res.json(survey);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch survey for worker" });
    }
}));
router.post("/takeSurvey/:id", middleware_1.authenticateJwtWorker, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workerId = req.headers.userId;
    const { responses } = req.body; // responses should be an array of {questionId , choiceId}
    try {
        const survey = yield prismaClient.survey.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        choices: true
                    }
                }
            }
        });
        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }
        const workerResponses = yield prismaClient.response.findMany({
            where: {
                //@ts-ignore
                workerId,
                surveyId: id,
            },
        });
        if (workerResponses.length > 0) {
            return res.send(403).json({ error: "worker has aready participated in this" });
        }
        const questionIds = survey.questions.map((q) => q.id);
        //@ts-ignore
        const submittedQuestionIds = responses.map((r) => r.questionId);
        if (questionIds.length !== submittedQuestionIds.length) {
            return res.status(400).json({ error: "All questions must be answered" });
        }
        //validate each submitted responses corresponds to a valid question and choice 
        for (const response of responses) {
            const question = survey.questions.find((q) => q.id === response.questionId);
            if (!question) {
                return res.status(400).json({ error: "Invalid question Id" });
            }
            const choice = question.choices.find((c) => c.id === response.choiceId);
            if (!choice) {
                return res.status(400).json({ error: "Invalid choice id" });
            }
        }
        const createdResponses = yield prismaClient.response.createMany({
            //@ts-ignore
            data: responses.map((response) => ({
                workerId,
                surveyId: id,
                questionId: response.questionId,
                choiceId: response.choiceId,
                responseTime: new Date(),
            })),
        });
        res.status(201).json({ message: 'Responses submitted successfully', responses: createdResponses });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to submit survey responses" });
    }
}));
exports.default = router;
