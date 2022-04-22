
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
    scheduleGet,
    scheduleGetById,
    schedulePost,
    schedulePut,
    scheduleDelete,
} = require('../controllers/shedules.controller')

router.get('/', scheduleGet);

router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	validateFields
], scheduleGetById);

router.post('/', [
	check('user', 'user is required').not().isEmpty(),
	check('patient', 'patient is required').not().isEmpty(),	
	validateFields
], schedulePost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], schedulePut);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], scheduleDelete);


module.exports = router;