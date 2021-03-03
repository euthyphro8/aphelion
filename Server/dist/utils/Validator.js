"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static IsUuid(candidate) {
        const matches = candidate.match(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
        return matches !== null && matches.length === 1;
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map