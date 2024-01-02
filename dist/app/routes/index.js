"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/category/category.route");
const brand_route_1 = require("../modules/brand/brand.route");
const review_route_1 = require("../modules/review/review.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRouter,
    },
    {
        path: '/product',
        route: product_route_1.ProductRouter,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRouter,
    },
    {
        path: '/brand',
        route: brand_route_1.brandRouter,
    },
    {
        path: '/review',
        route: review_route_1.reviewRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
