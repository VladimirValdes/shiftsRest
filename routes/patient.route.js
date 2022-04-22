
const { Router } = require('express');
const { check } = require('express-validator');

//const { validateFields, validateJWT } = require('../middlewares/index');

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
	patientGetById,
	patientDelete
} = require('../controllers/patient.controller')

router.post('/', [
	check('fullname', 'Name is required').not().isEmpty(),
	check('dni', 'DNI is required').not().isEmpty(),
	check('dni', 'DNI is required').custom( dniExists ),
	check('email', 'Email is not valid').isEmail(),
	check('email').custom( emailExist )
], patientPost);


/*router.get('/filter/:role', [
	check('role').custom( isRoleValido ),
	validateFields
], userRoles);*/

router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	
], patientGetById);



/*router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	validateFields
], userPut);*/

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	check('id').custom( userExitsById ),
	
], patientDelete);


module.exports = router;

