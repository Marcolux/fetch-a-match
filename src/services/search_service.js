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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = exports.SearchService = void 0;
var SearchService = /** @class */ (function () {
    function SearchService() {
        var _this = this;
        this.allBreads = function () { return __awaiter(_this, void 0, void 0, function () {
            var url, response, allBreads, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: 'include'
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        allBreads = _a.sent();
                        return [2 /*return*/, allBreads];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        }); };
        this.allDogsAvailable = function (filters) { return __awaiter(_this, void 0, void 0, function () {
            var url, queryParams_1, response, allDogs, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://frontend-take-home-service.fetch.com/dogs/search";
                        if (filters) {
                            queryParams_1 = new URLSearchParams();
                            if (filters.breeds.length > 0)
                                filters.breeds.forEach(function (breed) { return queryParams_1.append("breeds", breed); });
                            if (filters.zipCodes.length > 0)
                                filters.breeds.forEach(function (zipCode) { return queryParams_1.append("zipCodes", zipCode); });
                            if (filters.ageMin !== '')
                                queryParams_1.append("ageMin", filters.ageMin);
                            if (filters.ageMax !== '')
                                queryParams_1.append("ageMax", filters.ageMax);
                            url += "?".concat(queryParams_1.toString());
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: 'include'
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error(" Error: ".concat(response.status));
                        return [4 /*yield*/, response.json()];
                    case 3:
                        allDogs = _a.sent();
                        return [2 /*return*/, allDogs];
                    case 4:
                        error_2 = _a.sent();
                        console.error(error_2.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        }); };
        this.allDogsAvailableNavPage = function (navigationLink) { return __awaiter(_this, void 0, void 0, function () {
            var url, response, allDogs, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://frontend-take-home-service.fetch.com".concat(navigationLink);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: 'include'
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error(" Error: ".concat(response.status));
                        return [4 /*yield*/, response.json()];
                    case 3:
                        allDogs = _a.sent();
                        return [2 /*return*/, allDogs];
                    case 4:
                        error_3 = _a.sent();
                        console.error(error_3.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        }); };
        this.fetchDogsDetails = function (dogIds) { return __awaiter(_this, void 0, void 0, function () {
            var url, response, allDogs, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://frontend-take-home-service.fetch.com/dogs";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                credentials: 'include',
                                body: JSON.stringify(dogIds)
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error(" Error: ".concat(response.status));
                        return [4 /*yield*/, response.json()];
                    case 3:
                        allDogs = _a.sent();
                        return [2 /*return*/, allDogs];
                    case 4:
                        error_4 = _a.sent();
                        console.error(error_4.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return SearchService;
}());
exports.SearchService = SearchService;
exports.searchService = new SearchService();
