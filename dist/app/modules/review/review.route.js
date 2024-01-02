"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
// import auth from '../../middlewares/auth'
const router = express_1.default.Router();
router.post('/create', review_controller_1.reviewController.createReview);
// router.get('/get-all', categoryController.getAllCategory)
router.get('/getbyProductid/:id', review_controller_1.reviewController.getbyProductid);
exports.reviewRouter = router;
