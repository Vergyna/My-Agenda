const User = require('../models/user');
const comparePassword = require('../utils/comparePassword');
const hashPassword = require('../utils/hashPassword');

module.exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            console.log("Cannot find user with corresponding email");
            return res.redirect('/admin/login');
        }

        const user = await User.findOne({email : email, admin: true});

        // Cek if user with that email exist
        if(!user) {
            console.log("Account not found");
            return res.redirect('/admin/login');
        }
        
        let isValid = comparePassword(password, user.password);
        
        if(!isValid) {
            console.log('Invalid Password!');
            return res.redirect('/admin/login');
        }

        // Success
        if(user.admin) {
            req.session.adminId = user.userId;

            console.log('Logged in!');
            // return res.redirect(`/admin/${user.userId}`);
            return res.redirect('/admin');
        }
        else{
            console.log('Account not found');;
            return res.redirect('/admin/login');
        }

    }
    catch(error) {
        console.error("Login Error", error);
        return res.redirect('/admin/login')
    }
};

exports.Edit = async (req, res, next) => {
    try {
        console.log(req.body);

        await User.updateOne({agendaId: req.body.agendaId}, {
            $set : {
                nama: req.body.nama,
                telepon: req.body.telepon,
                tanggal_lahir: req.body.tanggal_lahir,
                email: req.body.email,
            }
        })

        console.log('Profil edited!');
        return res.redirect('/admin/profil');
        
    } catch (error) {
        console.error("edit-eror", error);
        return res.redirect('/admin/profil/edit')
        
    }
}

exports.Logout = (req, res, next) => {
    delete req.session.adminId;
    return res.redirect('/admin/login')
}
