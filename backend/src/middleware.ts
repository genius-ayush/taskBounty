import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_CREATOR, JWT_SECRET_WORKER } from "./config";

export const authenticateJwtCreator =(req:Request , res:Response , next:NextFunction)=>{


    const authHeader = req.headers.authorization ; 

    if(authHeader){
        const token = authHeader.split(" ")[1] ; 

        jwt.verify(token ,JWT_SECRET_CREATOR , (err , payload)=>{
            if(err){
                return res.sendStatus(403) ; 
            }

            if(!payload){
                return res.sendStatus(403) ; 
            }

            if(typeof payload === "string"){
                return res.sendStatus(403) ; 
            }
             
            req.headers.userId = payload.userId ; 
            console.log(payload) ; 
            next() ; 
        } )
    }else{
        res.sendStatus(401) ;
    }
}

export const authenticateJwtWorker =(req:Request , res:Response , next:NextFunction)=>{


    const authHeader = req.headers.authorization ; 

    if(authHeader){
        const token = authHeader.split(" ")[1] ; 

        jwt.verify(token ,JWT_SECRET_WORKER , (err , payload)=>{
            if(err){
                return res.sendStatus(403) ; 
            }

            if(!payload){
                return res.sendStatus(403) ; 
            }

            if(typeof payload === "string"){
                return res.sendStatus(403) ; 
            }
           
            req.headers.userId = payload.userId ; 
            next() ; 
        } )
    }else{
        res.sendStatus(401) ;
    }
}