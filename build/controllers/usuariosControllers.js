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
const database_1 = __importDefault(require("../database"));
class UsuariosControllers {
    GetUsrs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SP = 'call USR_GetAllUsers()';
            yield database_1.default.query(SP, function (err, result, field) {
                if (err) {
                    throw err;
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ text: 'No existen usuarios' });
                }
            });
        });
    }
    CreateUsr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SP = 'call USR_CreateUser(?)';
            console.log(req.params);
            yield database_1.default.query(SP, [req.params]);
            res.json({ texto: 'usuario creado' });
        });
    }
    GetUsrById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SP = 'call USR_GetUserById(?)';
            const { id } = req.params;
            yield database_1.default.query(SP, [id], function (err, result, field) {
                if (err) {
                    throw err;
                }
                else if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ text: 'el usuario no existe' });
                }
            });
        });
    }
    DesactivarUsr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SP = 'call USR_ChangeStatus(?)';
            const { id } = req.params;
            yield database_1.default.query(SP, [id]);
            res.json({ message: 'Usuario actualizado de estatus' });
        });
    }
    UpdateUsr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nom, ap, am, cont, corr } = req.body;
                let SP = 'call USR_UpdateUser(?,?,?,?,?,?)';
                yield database_1.default.query(SP, [nom, ap, am, cont, corr, id], function (err, result) {
                    if (err)
                        throw err;
                    res.json({ text: "Usuario actualizado" });
                });
            }
            catch (error) {
                res.status(404).json({ texto: 'algo salio mal' });
            }
        });
    }
    LoginUsr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let SP = 'call USR_Login(?)';
            let { correo, pass } = req.body;
            yield database_1.default.query(SP, [correo, pass], function (err, result) {
                if (err) {
                    throw err.message;
                }
                if (result.length > 0) {
                    res.json(result);
                }
                else {
                    res.status(404).json({ tex: "Datos incorrectos" });
                }
            });
        });
    }
}
const usuariosControllers = new UsuariosControllers();
exports.default = usuariosControllers;
