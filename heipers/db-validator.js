
const Category = require('../model/category')
const Products = require('../model/products')
const Role= require('../model/role')

const User= require('../model/user')

const IsValidRoles = async (role = '')=>{
    const roleExists = await Role.findOne({role})
    if(!roleExists){
        throw new Error(`el rol ${role} no esta registrado en la base de datos`)
    }
}
const emailExist = async(email = '')=>{
    const emailExists = await User.findOne({email})
    if(emailExists){
        throw new Error(`el email ${email} ingresado ya existe en la base de datos`)
    }
}
const userIdExist = async(id)=>{
    const userExist = await User.findById(id)
    if(!userExist){
        throw new Error(`el id ${id} no existe en la base de datos`)
    }
}
const categoryByIdExist = async (id)=>{
    const validateIdcategory = await Category.findById(id)
    if(!validateIdcategory){
        throw new Error('el id no es un id valido de la DB de category')
    }
}
const isByIdProductExist = async (id)=>{
    const existProduct = await Products.findById(id)
    if(!existProduct){
        throw new Error(`el id ${id} ingresado no existe en la base de datos`)
    }
}
module.exports = {
    IsValidRoles,
    emailExist,
    userIdExist,
    categoryByIdExist,
    isByIdProductExist
}