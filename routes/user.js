const {Router} = require('express')
const { check } = require('express-validator')
const { userGet, userPut, userPost, userDelete } = require('../controllers/user')
const { IsValidRoles, emailExist, userIdExist } = require('../heipers/db-validator')

const {
    validateFields,
    validateJWT,
    hasRole
}= require('../middlwares')

const router = Router()

router.get('/', userGet)
router.put('/:id',[
    check('id','la id no existe en la base de mongo').isMongoId(),
    check('role').custom(IsValidRoles),
    check('id').custom(userIdExist),
    validateFields
    ], userPut)
router.post('/',[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','no es un email valido').isEmail(),
    check('email').custom(emailExist),
    check('password','debe ingresar minimo 6 caracteres').isLength({min:6}),
    // check('role','EL ROL NO ES VALIDO').isIn(['ADMIN_ROLE','USE_ROLE']),
    check('role').custom(IsValidRoles),
    validateFields
], userPost)
router.delete('/:id',[
    validateJWT,
    // isAdmin,
    hasRole('ADMIN_ROLE','SELLER_ROLE'),
    check('id','la id no existe en la base de mongo').isMongoId(),
    check('id').custom(userIdExist),
    validateFields
], userDelete)

module.exports = router



