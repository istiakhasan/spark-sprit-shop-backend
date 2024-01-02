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
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Category create successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getAllCategory();
    (0, sendResponse_1.default)(res, {
        message: 'Category retrived successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield category_service_1.categoryService.getById(req.user, options, filters);
    (0, sendResponse_1.default)(res, {
        message: ' Category retrive  successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
exports.categoryController = {
    createCategory,
    getAllCategory,
    getById,
};
