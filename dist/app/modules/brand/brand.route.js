"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRouter = void 0;
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("./brand.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create', brand_controller_1.brandController.createBrand);
router.get('/get-all', brand_controller_1.brandController.getBrand);
router.get('/getbyid', (0, auth_1.default)('customer', 'admin'), brand_controller_1.brandController.getById);
exports.brandRouter = router;
