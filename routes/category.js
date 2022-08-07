const {Router} = require('express')
const { check } = require('express-validator')

const { createCategory, getCategories, getCategory, updateCategory, delateCategory } = require('../controllers/category')
const { categoryByIdExist } = require('../heipers/db-validator')
const { validateFields, validateJWT, isAdmin } = require('../middlwares')

const router = Router()

router.get('/', getCategories)

router.get('/:id',[
    check('id','no es un id valido de mongoDB').isMongoId(),
    check('id').custom(categoryByIdExist),
    validateFields
],getCategory)
router.get('/')
router.post('/',[
    validateJWT,
    check('name','el nombre es obligatorio').not().isEmpty(),
    validateFields
],createCategory)

router.put('/:id',[
    validateJWT,
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryByIdExist),
    validateFields
],updateCategory)

router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','el id ingresado no es valido de mongo').isMongoId(),
    check('id').custom(categoryByIdExist),
    validateFields
],delateCategory)
module.exports = router