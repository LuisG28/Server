"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosControllers_1 = __importDefault(require("../controllers/usuariosControllers"));
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usuariosControllers_1.default.GetUsrs);
        this.router.get('/:id', usuariosControllers_1.default.GetUsrById);
        this.router.post('/', usuariosControllers_1.default.CreateUsr);
        this.router.put('/:id', usuariosControllers_1.default.UpdateUsr);
        this.router.delete('/:id', usuariosControllers_1.default.DesactivarUsr);
        this.router.post('/login/', usuariosControllers_1.default.LoginUsr);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
