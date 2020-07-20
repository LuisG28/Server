import {Request,Response} from 'express';
class IndexControllers{
   public index (req : Request, res:Response){
   res.json({texto: '/api'})
   }
}
export const indexControllers =new IndexControllers();