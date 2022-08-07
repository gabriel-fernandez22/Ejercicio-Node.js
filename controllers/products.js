const {response} = require('express')


const Products = require('../model/products')

const getProducts = async (req, res=response) =>{
    const {limit=5, skip=0}=req.query
    const query = {status:true}

    const [total, products] = await Promise.all([
        Products.countDocuments(query),
        Products.find(query)
                .populate('user','name')
                .populate('category', 'name')
                .limit(Number(limit))
                .skip(Number(skip))
    ])
    res.json({
        total,products
    })

}

const getProduct = async (req, res=response) =>{
    const {id}= req.params
    
    const products = await Products.findById(id) 
                                   .populate('user','name')
                                   .populate('category', 'name')
    
    res.status(201).json({
        products
    })
}

const createProducts = async (req, res=response) =>{
    const {status, user, ...body} = req.body

    const productsDB = await Products.findOne({name:body.name.toUpperCase()})
    if(productsDB){
        return res.status(400).json({
            msg:`el name ${productsDB.name} ya existe en la base de datos`
        })
    }
    const data ={
        ...body,
        name:body.name,
        user:req.user._id
    }
    const products = new Products(data)

    await products.save()

    res.json(products)
}

const updateProducts = async (req, res=response) =>{
    const {id} = req.params
    const {status, user, ...body} = req.body

    const product = await Products.findByIdAndUpdate(id, body)

    res.status(201).json({product})
}

const deleteProducts =async (req, res=response) =>{
    const {id} = req.params
    const product = await Products.findByIdAndUpdate(id, {status:false})

    res.status(201).json({
        product
    })
}

module.exports ={
    getProducts,
    getProduct,
    createProducts,
    updateProducts,
    deleteProducts
}