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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const review_schema_1 = require("./review.schema");
const mongodb_1 = require("mongodb");
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_schema_1.Review.create(data);
    return result;
});
const getbyProductid = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    const andCondition = [];
    andCondition.push({ productId: id });
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield review_schema_1.Review.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('userId productId');
    const total = yield review_schema_1.Review.countDocuments(whereConditions);
    const ratingAggregation = yield review_schema_1.Review.aggregate([
        { $match: whereConditions },
        {
            $group: {
                _id: null,
                ratingSum: { $sum: '$rating' },
            },
        },
    ]);
    const totalRating = ratingAggregation;
    return {
        meta: {
            page,
            limit,
            total,
            totalRating,
        },
        data: result,
    };
});
const totalRating = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_schema_1.Review.aggregate([
        { $match: { productId: new mongodb_1.ObjectId(id) } },
        {
            $group: {
                _id: null,
                rating: { $sum: '$rating' },
                totalReviewer: { $sum: 1 },
            },
        },
    ]);
    return result;
});
exports.reviewService = {
    createReview,
    getbyProductid,
    totalRating,
};
