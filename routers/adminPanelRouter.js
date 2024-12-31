const { Router } = require("express");
const adminpanelCtrl = require('../controllers/adminPanelController');
const passport = require("passport");

const panelRouter = Router();

panelRouter.get('/', passport.userPassportAuth, adminpanelCtrl.homePage);

module.exports = panelRouter;