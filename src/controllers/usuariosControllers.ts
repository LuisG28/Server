import {Request, Response} from 'express';
import pool from '../database'
class UsuariosControllers{
    public  async GetUsrs (req:Request, res:Response):Promise<void>{
        let SP='call USR_GetAllUsers()';
        await pool.query(SP, function(err,result,field){
        if(err){
            throw err;
        }
        else if(result.length>0){
            res.json(result)
        }
        else {
            res.status(404).json({text : 'No existen usuarios'})
        }
        });
    }


    public async CreateUsr(req:Request, res:Response): Promise<any>{
        let SP = 'call USR_CreateUser(?)';
        console.log(req.params);
        await  pool.query(SP ,[req.params]);
        res.json({texto : 'usuario creado'});
    }

    public async GetUsrById(req: Request, res: Response): Promise<any>{
        let SP = 'call USR_GetUserById(?)'
        const{id}=req.params;
        await pool.query(SP,[id],function(err,result,field){
            if(err){
                throw err;
            }
            else if(result.length>0){
                res.json(result)
            }
            else {
                res.status(404).json({text : 'el usuario no existe'})
            }
            
        });
    }

    public async DesactivarUsr(req:Request, res:Response):Promise<void>{
        let SP='call USR_ChangeStatus(?)';
        const {id}= req.params;
        await pool.query(SP,[id]);
        res.json({message : 'Usuario actualizado de estatus'})
    }

    public async UpdateUsr(req:Request, res:Response):Promise<void>{
        try {
            const {id} = req.params;
            const {nom, ap, am, cont, corr} = req.body;
            let SP='call USR_UpdateUser(?,?,?,?,?,?)';
            await pool.query(SP,[nom, ap, am, cont, corr, id], function(err,result){
                if (err)throw err;
                res.json({text : "Usuario actualizado"});       
            });
        } catch (error) {
            res.status(404).json({texto: 'algo salio mal'})
        }
    }

    public async LoginUsr(req:Request, res:Response):Promise<void>{
        let SP='call USR_Login(?)';
        let {correo, pass}=req.body;
        await pool.query(SP,[correo, pass], function(err, result){
            if(err){
                throw err.message ;
            }if(result.length>0){
                res.json(result);
            }else{
                res.status(404).json({tex: "Datos incorrectos"});
            }
        }) 
    }

}
const usuariosControllers = new UsuariosControllers();
export default usuariosControllers;