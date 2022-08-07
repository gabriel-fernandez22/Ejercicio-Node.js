const { Schema, model }= require('mongoose')

const userShema = Schema({
    name:{
        type:String,
        required:[true, 'el nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true, 'el email es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        requerid:[true, 'passswor es obligatorio']
    },
    role:{
        type:String,
        requerid:true,
        default:'USE_ROLE',
        enum:['ADMIN_ROLE','USE_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    }

})

userShema.methods.toJSON = function(){
    const {__v,password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}
module.exports = model('User',userShema)