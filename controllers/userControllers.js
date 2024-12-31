const { json } = require("body-parser");
const user = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const SECRET_KEY = "1234";

module.exports.login = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.signupPage = (req, res) => {
    return res.render('./pages/signup');
}

module.exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        let data = await user.create(req.body);
        console.log("User Created.");
        return res.redirect('/user/login');
    } catch (error) {
        console.log(error);
        return res.redirect('/user/signup');
    }
}

module.exports.loginPage = (req, res) => {
    return res.render('./pages/login');
}

module.exports.profilePage = (req, res) => {
    const user = req.user || {};
    return res.render('./pages/profile', {
        user
    });
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect('/user/login');
};


module.exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confPassword } = req.body;
        let { id } = req.params;
        let User = await user.findById(id);

        if (User.password === oldPassword) {
            if (oldPassword !== newPassword) {
                if (newPassword === confPassword) {
                    User.password = newPassword;
                    await User.save();
                    console.log("password Change.");
                    return res.redirect('/user/logout');
                }
                else {
                    console.log("New Password and Confirm Password do not match.");
                }
            }
            else {
                console.log("Old Password and New Password are same..")
            }
        }
        else {
            console.log("Old Password is incorrect..")
        }

        return res.redirect(req.get('Referrer') || '/');
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/');
    }
}

module.exports.changePasswordPage = (req, res) => {
    return res.render('./pages/change-password');
}

module.exports.recoverPassword = async (req, res) => {
    try {
        let otp = Math.floor(10000 + Math.random() * 999999);
        let { email } = req.body;
        console.log(email);
        let User = await user.findOne({ email: email });
        if (User) {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "divu11480@gmail.com",
                    pass: "hvse jiua nlqa ylkd",
                },
            });

            const info = await transporter.sendMail({
                from: '<divu11480@gmail.com>', // sender address
                to: `${User.email}`, // list of receivers
                subject: "OTP Verify", // Subject line
                html: `<b>Hello OTP: ${otp}</b>`, // html body
            });

            if (info.messageId) {
                req.session.otp = otp;
                req.session.userId = User.id;
            }

            console.log("Message sent: %s", info.messageId);
            return res.redirect('/user/otp-verify');
        } else {
            console.log("User not found");
            return res.redirect(req.get('Referrer') || '/');
        }

    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/');
    }
}

module.exports.otpVerifyPage = (req, res) => {
    return res.render("./pages/otp-verify");
}

module.exports.otpVerify = (req, res) => {
    if (req.body.otp == req.session.otp) {
        res.clearCookie('otp');
        return res.redirect('/user/forgotPassword');
    }
    else {
        console.log("otp not match");
        return res.redirect(req.get('Referrer') || '/');
    }
}

module.exports.forgotPasswordPage = (req, res) => {
    return res.render('./pages/forgotPassword');
}

module.exports.forgotPassword = async (req, res) => {
    try {
        let { newPassword, confirmPassword } = req.body;
        // console.log("session log", req.session.userId);

        let User = await user.findById(req.session.userId);
        console.log(User);
        if (newPassword == confirmPassword) {
            User.password = newPassword;
            await User.save();
            res.clearCookie('email');
            return res.redirect('/user/login');
        }
        else {
            return res.redirect(req.get('Referrer') || '/');
        }
    } catch (error) {

        console.log(error);
        return res.redirect(req.get('Referrer') || '/');
    }
}
