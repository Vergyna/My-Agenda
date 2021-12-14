const {v4: uuidv4} = require('uuid');
const Agenda = require('../models/agenda')

module.exports.Add = async (req, res, next) => {
    try{
        const id = uuidv4();
        req.body.agendaId = id;

        const newAgenda = new Agenda(req.body);
        await newAgenda.save();

        
        console.log(newAgenda);

        return res.redirect('/admin/daftar_agenda');

    }
    catch (error) {
        console.error('tambah-agenda-error', error);
        return res.redirect('/admin/tambah_agenda');
    }
}

exports.Edit = async (req, res, next) => {
    try{
        console.log(req.body);

        await Agenda.updateOne({agendaId: req.body.agendaId}, {
            $set : {
                nama_kegiatan: req.body.nama_kegiatan,
                telepon: req.body.telepon,
                tanggal: req.body.tanggal,
                waktu: req.body.waktu,
                keterangan: req.body.keterangan,
                tempat: req.body.tempat,
            }
        })

        console.log('Agenda edited!');
        return res.redirect('/admin/daftar_agenda');
    }
    catch (error) {
        console.error('tambah-agenda-error', error);
        return res.redirect('/admin/tambah_agenda');
    }
}

exports.Delete = async (req, res, next) => {
    try{
        const agenda = await Agenda.findOne({agendaId: req.body.agendaId});
        console.log(agenda);

        if(!agenda){
            console.log("Agenda tidak ditemukan!");
            return res.redirect('/admin/daftar_agenda')
        }

        await Agenda.deleteOne({agendaId: req.body.agendaId})

        console.log('Agenda deleted!');
        return res.redirect('/admin/daftar_agenda');
    }
    catch(error) {
        console.error('delete-agenda-error', error);
        return res.redirect('/admin/tambah_agenda');
    }
}

exports.Selesai = async (req, res, next) => {
    try{
        const agenda = await Agenda.findOne({agendaId: req.body.agendaId});
        console.log(agenda);

        if(!agenda){
            console.log("Agenda tidak ditemukan!");
            return res.redirect('/admin/daftar_agenda')
        }

        await Agenda.updateOne({agendaId: req.body.agendaId}, {
            $set : {
                selesai: true
            }
        })

        console.log('Agenda ended!');
        return res.redirect('/admin/daftar_agenda');
    }
    catch(error) {
        console.error('end-agenda-error', error);
        return res.redirect('/admin/tambah_agenda');
    }
}