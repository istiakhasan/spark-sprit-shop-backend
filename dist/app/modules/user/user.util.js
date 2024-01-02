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
exports.genarateCustomerId = void 0;
const user_model_1 = require("./user.model");
const genarateCustomerId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findLastCustomer = yield user_model_1.User.findOne({
        role: role,
    }, { userId: 1, _id: 0 }).sort({ createdAt: -1 });
    const lastCustomerId = findLastCustomer
        ? (_a = findLastCustomer === null || findLastCustomer === void 0 ? void 0 : findLastCustomer.userId) === null || _a === void 0 ? void 0 : _a.substring(6)
        : undefined;
    const currentId = lastCustomerId || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    let firstCharechter = '';
    if (role === 'customer') {
        firstCharechter = 'C';
    }
    else if (role === 'admin') {
        firstCharechter = 'A';
    }
    else if (role === 'seller') {
        firstCharechter = 'S';
    }
    else if (role === 'super_admin') {
        firstCharechter = 'A';
    }
    const finalId = `${firstCharechter}-${new Date()
        .getFullYear()
        .toString()
        .substring(2)}${new Date().getMonth()}${incrementedId}`;
    return finalId;
});
exports.genarateCustomerId = genarateCustomerId;
