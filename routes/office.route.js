
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const {
	isRoleValido, 
    emailExist,
    userExitsById,
	dniExists
} = require('../helpers/db-validators');

const router = Router();

const {
    officeGet,
    officeGetById,
    officePost,
    officePut,
    officeDelete,
} = require('../controllers/office.controller')

router.get('/', officeGet);


router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	validateFields
], officeGetById);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	validateFields
], officePost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], officePut);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], officeDelete);


module.exports = router;

