const {request, response} = require('express') 

const jwt=require('jsonwebtoken')
const User = require('../model/user')

const validateJWT = async(req= request, res=response, next)=>{
     const token = req.header('x-token')
     if(!token){
         return res.status(500).json({
             msg:'no hay token en la peticion de request'
         })
     }
     try {
         const {uid} =  jwt.verify(token, process.env.SECRETOPRIVATEKEY)
         const user = await User.findById(uid)
         if(!user){
             return res.status(401).json({
                 msg:'token no valido, el usuario no existe '
             })
         }
         if(!user.status){
            return res.status(401).json({
                msg:'token no valido, el usuario tiene el acceso denegado'
            })
         }
         req.user = user
         next()
     } catch (error) {
         console.log(error)
         res.status(401).json({
             msg:'token no valido'
         })
     }
}
module.exports = {
    validateJWT
}