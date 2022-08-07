const {Router} = require('express')
const { check } = require('express-validator')
const { getProducts, getProduct, createProducts, updateProducts, deleteProducts } = require('../controllers/products')
const { categoryByIdExist, isByIdProductExist } = require('../heipers/db-validator')
const { validateJWT, validateFields, isAdmin } = require('../middlwares')

const router = Router()

router.get('/',getProducts)

router.get('/:id',[
    check('id','el id no es valido de mongoDB').isMongoId,
    check('id').custom(isByIdProductExist),
    validateFields
],getProduct)

router.post('/',[
    validateJWT,
    check('category','el id no es valido de mongoDB').isMongoId(),
    check('category').custom(categoryByIdExist),
    validateFields
],createProducts)

router.put('/:id',[
    validateJWT,
    check('id').custom(isByIdProductExist),
    validateFields
],updateProducts)

router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','el id no es valido de mongoDB').isMongoId(),
    check('id').custom(isByIdProductExist),
    validateFields
],deleteProducts)


module.exports = router