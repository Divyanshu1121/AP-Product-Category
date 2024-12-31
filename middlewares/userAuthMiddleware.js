const jwt = require('jsonwebtoken');
const SECRET_KEY = "1234";

module.exports.userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).redirect('/user/login');
    }
};
