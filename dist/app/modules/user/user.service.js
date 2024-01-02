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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const user_util_1 = require("./user.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.role) {
        data.role = 'customer';
    }
    const { userId, role, phone } = data;
    const isUserExist = yield user_model_1.User.findOne({ email: data.email });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exist');
    }
    //   generate customer id
    const finalId = yield (0, user_util_1.genarateCustomerId)(data.role);
    data.userId = finalId;
    const user = yield user_model_1.User.create(data);
    const { _id } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, phone, _id }, config_1.default.secret, config_1.default.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, phone, _id }, config_1.default.refresh_secret, config_1.default.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ phone: data.phone });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not exist');
    }
    const { userId, phone, password: savePassword, role, _id } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, phone, _id }, config_1.default.secret, config_1.default.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, phone, _id }, config_1.default.refresh_secret, config_1.default.refresh_expires_in);
    if (!bcrypt_1.default.compare(data.password, savePassword)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    return {
        accessToken,
        refreshToken,
    };
});
exports.userService = {
    createUser,
    login,
};
