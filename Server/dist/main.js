"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Server_1 = tslib_1.__importDefault(require("./coms/Server"));
const Logger_1 = tslib_1.__importDefault(require("./utils/Logger"));
const logger = new Logger_1.default();
const server = new Server_1.default();
server.start();
//# sourceMappingURL=main.js.map