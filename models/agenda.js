const mongoose = require('mongoose')

const agenda = mongoose.model('agenda', new mongoose.Schema({
    agendaId: {type:String, required: true, unique:true},
    nama_kegiatan: {type: String, required: true, unique: true},
    tanggal: {type: String, required: true},
    waktu: {type:String, required:true},
    keterangan: {type: String, required: true},
    tempat: {type: String, required: true},
    selesai: {type: Boolean, required: true, default: false},
}))

module.exports = agenda;