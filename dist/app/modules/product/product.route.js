"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create', product_controller_1.productController.createProduct);
router.get('/all-products', product_controller_1.productController.getAll);
router.get('/similar-product/:categoryid', product_controller_1.productController.similarProduct);
router.get('/productById', (0, auth_1.default)('customer', 'admin'), product_controller_1.productController.getProductByUserId);
router.delete('/:id', product_controller_1.productController.deleteProduct);
router.get('/:id', product_controller_1.productController.getsingleProduct);
exports.ProductRouter = router;
