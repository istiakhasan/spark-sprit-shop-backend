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
exports.brandController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const brand_service_1 = require("./brand.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_service_1.brandService.createBrand(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Brand create successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getBrand = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brand_service_1.brandService.getBrand();
    (0, sendResponse_1.default)(res, {
        message: 'Brand retrived successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield brand_service_1.brandService.getById(req.user, options, filters);
    (0, sendResponse_1.default)(res, {
        message: ' Brand retrive  successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
exports.brandController = {
    createBrand,
    getBrand,
    getById,
};
