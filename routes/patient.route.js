
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
    patientGet,
	patientPost,
	patientPut,
	patientGetById,
	patientDelete
} = require('../controllers/patient.controller')

router.get('/', patientGet);



router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientGetById);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('dni', 'DNI is required').not().isEmpty(),
	check('dni', 'DNI is required').custom( dniExists ),
	check('email', 'Email is not valid').isEmail(),
	check('email').custom( emailExist ),
	check('insurance_name', 'insurance_name is required').not().isEmpty(),
	check('insurance_number', 'insurance_number is required').not().isEmpty(),
	validateFields
], patientPost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientPut);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientDelete);


module.exports = router;