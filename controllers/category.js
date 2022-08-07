const {response} = require('express')

const Category = require('../model/category')

const getCategories = async (req, res= response)=>{
    const query =  {status:true}
    const {limit = 5, skip=0} = req.query
    
    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .limit(Number(limit))
                .skip(Number(skip))
    ])
    res.json({
        total,category
    })

}
const getCategory = async (req, res= response)=>{
    const {id} = req.params
    const category = await Category.findById(id)
                                   .populate('user','name')
  res.json({category})                                 

}
const updateCategory = async (req, res= response)=>{
     const id = req.params.id
     const name = req.body.name.toUpperCase()
     
     const category = await Category.findByIdAndUpdate(id, name)

     res.json({category})
}


const createCategory = async (req, res = response)=> {
    const name = req.body.name.toUpperCase()

    const categoryDB = await Category.findOne({ name })

    if (categoryDB) {
        return res.status(500).json({
            msg: 'el nombre de esta categoria ya existe en la base de datos'
        })
    }
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data)

    await category.save()

    res.status(201).json(category)

}
const delateCategory = async (req, res= response)=>{
    const {id} = req.params
    const category = await Category.findByIdAndUpdate(id, {status:false})
    const authUser = req.user
    res.json({category, authUser})

}
module.exports ={
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    delateCategory
}