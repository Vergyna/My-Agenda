const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    nama: {type: String,  required: true},
    userId: {type: String,  required: true, unique: true},
    admin: {type: Boolean, required: true, default: false},
    telepon: {type: String, required: true},
    tanggal_lahir: {type: String, required: true},
    alamat: {type: String,  required: true},
    email: {type: String,  required: true, unique: true},
    password: {type: String, required: true}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = User;