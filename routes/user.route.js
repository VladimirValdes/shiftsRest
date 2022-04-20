
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const { 
    isRoleValido,
    emailExist,
    userExitsById
} = require('../helpers/db-validators');

const router = Router();

const {
    userGet,
    userGetById,
    userPost,
    userPut,
    userDelete
} = require('../controllers/user.controller')

router.get('/', userGet);

router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	validateFields
], userGetById);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('dni', 'DNI is required').not().isEmpty(),
	check('password', 'Password should be greater than').isLength({ min: 6 }),
	check('email', 'Email is not valid').isEmail(),
	check('email').custom( emailExist ),
	validateFields
], userPost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	// check('role').custom( isRoleValido ),
	validateFields
], userPut);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	validateFields
], userDelete);


module.exports = router;

