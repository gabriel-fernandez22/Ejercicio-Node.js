const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') =>{
   
    return new Promise((resolve, reject)=>{
       
        const payload = {uid}
       
        jwt.sign(payload, process.env.SECRETOPRIVATEKEY,{
            expiresIn:'5h'
        },(err, token)=>{
            if(err){
                console.log(err)
                reject('sucedio un error al crear el token')
            }else{
                resolve(token)
            }
        }) 
    })
}
module.exports={generateJWT}