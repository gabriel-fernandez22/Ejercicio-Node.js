const mongoose = require('mongoose')

const dbconection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('base de datos funcionando')
    } catch (error) {
        console.log(error)
        throw new Error('ERROR AL INICIAR BASE DE DATOS')
    }
}
module.exports = {dbconection}