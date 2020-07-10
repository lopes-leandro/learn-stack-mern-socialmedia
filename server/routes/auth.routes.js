import express from 'express';
import authController from './../controllers/auth.controller';

const router = express.Router();

router.route('/auth/v1/signin')
    .post(authController.signin);

router.route('/auth/v1/signout')
    .get(authController.signout);

export default router;