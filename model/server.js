const express = require ('express')
const cors = require('cors')
const { dbconection } = require('../db/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.userPath = "/api/users"
        this.authPath = "/api/auth"
        this.categoryPath = "/api/categories"
        this.productPath = "/api/products"
        this.dbConect()
        
        this.middlwares()
        this.routes()
    }
    async dbConect(){
        await dbconection()
    }
    middlwares(){
       
        this.app.use( express.json() )
        this.app.use( cors())
    }   
    routes(){
         this.app.use(this.userPath, require('../routes/user'))
         this.app.use(this.authPath, require('../routes/api-auth'))
         this.app.use(this.categoryPath, require('../routes/category'))
         this.app.use(this.productPath, require('../routes/products'))
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}
module.exports = Server