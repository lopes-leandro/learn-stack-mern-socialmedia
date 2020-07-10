import express from 'express';
import userController from './../controllers/user.controller';
import authController from './../controllers/auth.controller';

const router = express.Router();

router.route('/api/v1/users')
    .get(userController.list)
    .post(userController.create)

router.route('/api/v1/users/:userId')
    .get(authController.requireSignin,userController.read)
    .put(authController.requireSignin, authController.hasAuthorization,userController.update)
    .delete(authController.requireSignin, authController.hasAuthorization,userController.remove)

// configuramos o router Express para lidar com parâmetro
// em uma rota solicitada
router.param('userId', userController.userById);

router.route('/api/v1/users/photo/:userId')
    .get(userController.photo, userController.defaultPhoto);

router.route('/api/v1/users/defaultPhoto')
    .get(userController.defaultPhoto);

export default router;