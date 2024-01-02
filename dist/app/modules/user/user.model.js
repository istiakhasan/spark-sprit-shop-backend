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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'seller', 'super_admin'],
        default: 'customer',
    },
    bioData: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    country: {
        type: {
            label: String,
            value: String,
        },
    },
    city: {
        type: String,
    },
    post_code: {
        type: String,
    },
    delivery_address: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password;
        },
    },
});
// userSchema.pre('save',async function(next){
// })
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', userSchema);
