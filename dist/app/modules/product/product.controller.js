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
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = require("./product.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Product create successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'minPrice',
        'maxPrice',
        'location',
        'searchTerm',
        'price',
        'category',
        'colors',
        'brands',
    ]);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield product_service_1.productService.getAll(options, filters);
    (0, sendResponse_1.default)(res, {
        message: 'Product retrived successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.deleteProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Product Deleted successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getsingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getsingleProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        message: 'Product retrive  successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const similarProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.similarProduct(req.params.categoryid);
    (0, sendResponse_1.default)(res, {
        message: 'Similar Product retrive  successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
const getProductByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm']);
    const options = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield product_service_1.productService.getProductByUserId(req.user, options, filters);
    (0, sendResponse_1.default)(res, {
        message: ' Product retrive  successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
exports.productController = {
    createProduct,
    getAll,
    deleteProduct,
    getsingleProduct,
    similarProduct,
    getProductByUserId,
};
