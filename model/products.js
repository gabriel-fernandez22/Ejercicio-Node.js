const {Schema, model} = require('mongoose')

const productSchema = Schema({
    name:{
        type:String,
        requerid:[true, 'el nombre es obligatorio']
    },
    status:{
        type:Boolean,
        requerid:true,
        default:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        requerid:true
    },
    price:{
        type:Number,
        requerid:[true, 'el precio es obligatorio']
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        requerid:true
    },
    description:{type:String},
    available:{type:Boolean, default:true}
})

productSchema.methods.toJSON = function (){
    const {__v, status, ... data} = this.toObject()
    return data;
}

module.exports = model('Product', productSchema)