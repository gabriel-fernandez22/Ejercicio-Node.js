const Fieldsvalidation  = require('../middlwares/validate-fields')
const  RolesValidation  = require('../middlwares/validate-role')
const JWTvalidation  = require('../middlwares/validate.jwt')


module.exports ={
    ...Fieldsvalidation,
    ...RolesValidation,
    ...JWTvalidation
}