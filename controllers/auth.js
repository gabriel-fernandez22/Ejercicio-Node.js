const User = require("../model/user")
const {response} = require('express')
const bcryptjs = require("bcryptjs")
const { generateJWT } = require("../heipers/generate-jwt")

const login = async(req,res= response)=>{
    const {email, password} = req.body
    try {
       const user = await User.findOne({email})
       if(!user){
           return res.status(401).json({
               msg:'el imail ingresado no es valido'
           })
       }
       if(!user.status){
        return res.status(401).json({
            msg:'error, usted no es un usuario valido de nuestra plataforma'
           })
       }
       const validPaswword = bcryptjs.compareSync(password, user.password)
       if(!validPaswword){
          return res.status(401).json({
            msg:'el password ingresado no es valido'
       })
    }
    const token = await generateJWT(user.id)
    res.json({
        user,token
    })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'error, comuniquese con el administrador'
        })
    }

   
}


module.exports= {
    login
}