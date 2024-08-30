"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    id;
    title;
    description;
    completed;
    id_user;
    constructor(id = "", title = "", description = "", completed = false, id_user = "") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.id_user = id_user;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getCompleted() {
        return this.completed;
    }
    setCompleted(completed) {
        this.completed = completed;
    }
    getIdUser() {
        return this.id_user;
    }
    setUserId(id_user) {
        this.id_user = id_user;
    }
}
exports.Task = Task;
