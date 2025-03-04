"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchemaEdit = exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    id_user: zod_1.z.string().min(1),
});
exports.TaskSchemaEdit = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
