"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = exports.fromBase64 = void 0;
function fromBase64(content) {
    return Buffer.from(content, "base64").toString("ascii");
}
exports.fromBase64 = fromBase64;
function toBase64(content) {
    return Buffer.from(content).toString("base64");
}
exports.toBase64 = toBase64;
