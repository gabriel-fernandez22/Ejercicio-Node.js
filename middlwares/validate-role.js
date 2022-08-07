const {response} = require('express')
const Role = require('../model/role')

const isAdmin = (req, res=response, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg:'primero se debe verificar el jwt'
        })
    }
    const {role, name}= req.user
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no es un usuario permitido para ejetutar esta accion`
        })
    }
    next()
}
const hasRole = (...roles )=>{
    return (req, res=response, next)=>{
        if(!req.user){
            return res.status(500).json({
                msg:'primero se debe verificar el jwt'
            })
        }
        
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`el servicio require uno de estos roles${roles} `
            })
        }
        next()
    }
}

module.exports ={
    isAdmin,hasRole
}