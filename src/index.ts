import express, {application, Application, urlencoded}  from "express";
import morgan from 'morgan';
import cors from 'cors'; 

import indexRoutes from "./routes/indexRoutes";
import UsuariosRoutes from "./routes/UsuariosRoutes";

class Server{
    public app: Application;
    constructor(){//metodo que se ejecuta apenas instanciando la clase
        this.app = express();//incializamos express
        this.config();
        this.routes();
    }

    config() : void {
        this.app.set('port', process.env.PORT || 3000) ; //process.env.port recupera el puerto en el sistema, si hay lo toma y si no ocupa el 3000
        this.app.use(morgan('dev'));//se visualizan las peticiones del cliente
        this.app.use(cors());//para que angular pueda pedir los datos al servidor
        this.app.use(express.json());//acepta formatos json
        this.app.use(urlencoded({extended:false}));
    }

    routes() : void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/Usuarios',UsuariosRoutes);
    }

    star() : void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get("port"));
        });
    }

}

const server = new Server();
server.star();