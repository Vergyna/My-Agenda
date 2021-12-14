const {v4: uuidv4} = require('uuid');



const User = require('../models/user')
const hashPassword = require('../utils/hashPassword')
const comparePassword = require('../utils/comparePassword')

module.exports.Signup = async (req, res) => {
    try{

        const user = await User.findOne({
            email : req.body.email
        });

        if(user) {
            console.log('User with same email found!');
            return res.redirect('/register');
        }

        const hash = await hashPassword(req.body.password);
        
        const id = uuidv4();
        req.body.userId = id;

        delete req.body.confirmPassword;
        req.body.password = hash;

        console.log('CHECKPOINT')
        const newUser = new User(req.body);
        await newUser.save();

        
        console.log(newUser);

        return res.redirect('/login');
    }
    catch (error) {
        console.error('signup-error', error);
        return res.redirect('/register');
    }
}
exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            console.log("Cannot find user with corresponding email");
            return res.redirect('/login');
        }

        const user = await User.findOne({email : email, admin: false});

        // Cek if user with that email exist
        if(!user) {
            console.log("Account not found");
            return res.redirect('/login');
        }
        
        let isValid = comparePassword(password, user.password);
        
        if(!isValid) {
            console.log('Invalid Password!');
            return res.redirect('/login');
        }
          // Success
          if(!user.admin) {

            req.session.userId = user.userId;

            console.log('Logged in!');
            return res.redirect(`/`);
        }
        else{
            console.log('Account not found');;
            return res.redirect('/login');
        }

    }
    catch(error) {
        console.error("Login Error", error);
        return res.redirect('/login');
    }
};
exports.Logout = (req, res, next) => {
    delete req.session.userId;
    return res.redirect('/login');
}