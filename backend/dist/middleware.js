"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwtWorker = exports.authenticateJwtCreator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authenticateJwtCreator = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_CREATOR, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers.userId = payload.userId;
            console.log(payload);
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwtCreator = authenticateJwtCreator;
const authenticateJwtWorker = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET_WORKER, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers.userId = payload.userId;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwtWorker = authenticateJwtWorker;
