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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_schema_1 = require("./product.schema");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_schema_1.Product.create(data);
    return result;
});
const getAll = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const andCondition = [];
        if (searchTerm) {
            andCondition.push({
                $or: [
                    ...['name', 'status', 'category.name'].map(field => ({
                        [field]: {
                            $regex: searchTerm,
                            $options: 'i',
                        },
                    })),
                ],
            });
        }
        if (filtersData === null || filtersData === void 0 ? void 0 : filtersData.category) {
            const categoryValues = JSON.parse(filtersData.category);
            if (Array.isArray(categoryValues) && categoryValues.length > 0) {
                andCondition.push({
                    $or: [
                        ...categoryValues.map(field => ({
                            ['category.name']: {
                                $eq: field,
                            },
                        })),
                    ],
                });
            }
        }
        if (filtersData === null || filtersData === void 0 ? void 0 : filtersData.brands) {
            const brandsValue = JSON.parse(filtersData.brands);
            if (Array.isArray(brandsValue) && brandsValue.length > 0) {
                andCondition.push({
                    $or: [
                        ...brandsValue.map(field => ({
                            ['brands.name']: {
                                $eq: field,
                            },
                        })),
                    ],
                });
            }
        }
        if (filtersData === null || filtersData === void 0 ? void 0 : filtersData.colors) {
            const colorsValues = JSON.parse(filtersData.colors);
            if (Array.isArray(colorsValues) && colorsValues.length > 0) {
                andCondition.push({
                    $or: [
                        ...colorsValues.map(field => ({
                            colors: field,
                        })),
                    ],
                });
            }
        }
        if (filtersData.minPrice) {
            andCondition.push({
                price: {
                    $gte: Number(filtersData.minPrice),
                },
            });
        }
        if (filtersData.maxPrice) {
            andCondition.push({
                price: {
                    $lte: Number(filtersData.maxPrice),
                },
            });
        }
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }
        const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
        const aggregatePipeline = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'brands',
                },
            },
            { $match: whereConditions },
            { $unwind: '$category' },
            { $unwind: '$brands' },
            { $sort: sortConditions },
            { $skip: skip },
            { $limit: limit },
        ];
        const aggregatePipelineForTotal = [
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'brands',
                },
            },
            { $match: whereConditions },
            { $count: 'total' },
        ];
        const result = yield product_schema_1.Product.aggregate(aggregatePipeline).exec();
        const calculateTotal = yield product_schema_1.Product.aggregate(aggregatePipelineForTotal).exec();
        const total = calculateTotal.length > 0 ? calculateTotal[0].total : 0;
        return {
            meta: {
                page,
                limit,
                total,
                whereConditions,
            },
            data: result,
        };
    }
    catch (error) {
        // Handle errors here
        console.error('Error in getAll:', error);
        throw error;
    }
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_schema_1.Product.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product is not in database');
    }
    const result = yield product_schema_1.Product.deleteOne({ _id: id });
    return result;
});
const getsingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_schema_1.Product.findById(id)
        .populate('categoryId')
        .populate('userId')
        .populate('brand');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not exist');
    }
    return result;
});
const similarProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_schema_1.Product.find({ categoryId: id })
        .populate('categoryId')
        .populate('userId')
        .populate('brand');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not exist');
    }
    return result;
});
const getProductByUserId = (user, options, filters) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield product_schema_1.Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_schema_1.Product.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.productService = {
    createProduct,
    getAll,
    deleteProduct,
    getsingleProduct,
    similarProduct,
    getProductByUserId,
};
