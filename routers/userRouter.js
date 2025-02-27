const { Router } = require("express");
const userController = require('../controllers/userControllers');
const passport = require("passport");
const user = require("../models/userSchema");
const { userAuth } = require('../middlewares/userAuthMiddleware');

const userRouter = Router();

userRouter.get('/signup', userController.signupPage);
userRouter.post('/signup', userController.signup);
userRouter.get('/login', userController.loginPage)
userRouter.post('/login', passport.authenticate('user', { failureRedirect: '/user/login' }), userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/profile', userAuth, userController.profilePage);

userRouter.post('/change-password/:id', userController.changePassword);

userRouter.get('/change-password', userController.changePasswordPage)

userRouter.post('/recover', userController.recoverPassword);

userRouter.get('/otp-verify', userController.otpVerifyPage);
userRouter.post('/otp-verify', userController.otpVerify);

userRouter.get('/forgotPassword', userController.forgotPasswordPage);
userRouter.post('/forgotPassword', userController.forgotPassword);

module.exports = userRouter;
