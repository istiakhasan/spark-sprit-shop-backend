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
exports.categoryService = void 0;
const category_schema_1 = require("./category.schema");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, 'data');
    const result = yield category_schema_1.Category.create(data);
    return result;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_schema_1.Category.find().select('name  _id');
    return result;
});
const getById = (user, options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    const { searchTerm } = filters;
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: ['name'].map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    andCondition.push({ userId: user === null || user === void 0 ? void 0 : user._id });
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield category_schema_1.Category.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('userId');
    const total = yield category_schema_1.Category.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.categoryService = {
    createCategory,
    getAllCategory,
    getById,
};
