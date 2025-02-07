"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var isEnvGitHub = ((_a = import.meta.env) === null || _a === void 0 ? void 0 : _a.MODE) === 'production';
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    base: isEnvGitHub ? '/fetch-a-match/login' : '/login',
});
