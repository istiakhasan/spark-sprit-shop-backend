"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create', category_controller_1.categoryController.createCategory);
router.get('/get-all', category_controller_1.categoryController.getAllCategory);
router.get('/getbyid', (0, auth_1.default)('customer', 'admin'), category_controller_1.categoryController.getById);
exports.CategoryRouter = router;
