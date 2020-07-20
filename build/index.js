"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const UsuariosRoutes_1 = __importDefault(require("./routes/UsuariosRoutes"));
class Server {
    constructor() {
        this.app = express_1.default(); //incializamos express
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //process.env.port recupera el puerto en el sistema, si hay lo toma y si no ocupa el 3000
        this.app.use(morgan_1.default('dev')); //se visualizan las peticiones del cliente
        this.app.use(cors_1.default()); //para que angular pueda pedir los datos al servidor
        this.app.use(express_1.default.json()); //acepta formatos json
        this.app.use(express_1.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/Usuarios', UsuariosRoutes_1.default);
    }
    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get("port"));
        });
    }
}
const server = new Server();
server.star();
