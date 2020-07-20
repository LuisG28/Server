import {Router}  from "express";
import {indexControllers}  from "../controllers/indexControllers" ;

class indexRoutes{
    router : Router = Router();
    constructor(){
        this.config();
    }

    config() : void {
        this.router.get('/', indexControllers.index );
    }
    
}
const IndexRoutes =new indexRoutes();
export default IndexRoutes.router;