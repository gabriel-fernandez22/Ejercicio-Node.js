const bcryptjs = require('bcryptjs')
const {response} = require('express')
const { Promise } = require('mongoose')

const User = require('../model/user')

const userGet = async (req,res = response)=>{
    const query = {status: true}

    const {limit = 5, skip=0}= req.query 
    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
    ])
    res.json({
       total,user
    })
}
const userPut =  async(req,res = response)=>{
    const id = req.params.id
    const {_id,password,email, ...data} = req.body
    if(password){
        const salt = bcryptjs.genSaltSync()
        data.password = bcryptjs.hashSync(password,salt)
    }
    const user = await User.findByIdAndUpdate(id,data)
    res.json({
        user
    })
}
const userPost =  async (req,res = response)=>{
    const {name,email,password,role} = req.body
    const user = new User({name,email,password,role})
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password,salt)
    await user.save()
    res.json({
        user
    })
}
const userDelete = async (req,res = response)=>{
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, {status:false})
    const authUser = req.user
    // const user = await User.findByIdAndDelete(id)
    res.json({
        user,
        authUser
    })
}
module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}