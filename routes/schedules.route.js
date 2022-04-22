
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
    schedulesGet,
    schedulesGetById,
    schedulesPost,
    schedulesPut,
    schedulesDelete,
} = require('../controllers/schedules.controller')

router.get('/', schedulesGet);

router.get('/:id',[
    check('id', 'Id is not valid').isMongoId(),
	validateFields
], schedulesGetById);

router.post('/', [
	check('user', 'user is required').not().isEmpty(),
	check('patient', 'patient is required').not().isEmpty(),	
	validateFields
], schedulesPost);

router.put('/:id',[
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], schedulesPut);

router.delete('/:id', [
	check('id', 'Id is not valid').isMongoId(),
	validateFields
], schedulesDelete);


module.exports = router;