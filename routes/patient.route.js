
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares/index');

const {
	isRoleValido, 
    emailExist,
	dniPatientExists,
    userExitsById,
	dniExists
} = require('../helpers/db-validators');

const router = Router();

const {
    patientGet,
	patientPost,
	patientPut,
	patientGetById,
	patientDelete,
	selectPatient
} = require('../controllers/patient.controller')

router.get('/', patientGet);



router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientGetById);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('dni', 'DNI is required').not().isEmpty(),
	check('dni', 'DNI is required').custom( dniPatientExists ),
	check('email', 'Email is not valid').isEmail(),
	check('email').custom( emailExist ),
	
	validateFields
], patientPost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientPut);


router.put('/selectPatient/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], selectPatient);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], patientDelete);


module.exports = router;