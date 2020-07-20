import {Router}  from "express";
import usuaiosControllers from '../controllers/usuariosControllers';

class UsuariosRoutes{
    router : Router = Router();
    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('/', usuaiosControllers.GetUsrs);
        this.router.get('/:id', usuaiosControllers.GetUsrById);
        this.router.post('/', usuaiosControllers.CreateUsr);
        this.router.put('/:id', usuaiosControllers.UpdateUsr);
        this.router.delete('/:id', usuaiosControllers.DesactivarUsr);
        this.router.post('/login/', usuaiosControllers.LoginUsr);
    }
    
}
const usuariosRoutes =new UsuariosRoutes();
export default usuariosRoutes.router;