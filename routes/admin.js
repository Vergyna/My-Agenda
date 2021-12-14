const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

const Agenda = require('../models/agenda');

router.post('/login',  AdminController.Login)

router.get('/login', (req, res, next) => {
    if(!req.session.adminId){
        res.render('admin/login', {title: 'Admin - Login', layout: 'layouts/admin_layout'});
    }
    else{
        res.redirect('/admin')
    }
});

router.get('/', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/index', {title: 'Home', layout: 'layouts/admin_layout'});
    }
});

router.get('/daftar_agenda', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const data = await Agenda.find();
        res.render('admin/daftar_agenda', {title: 'Daftar Agenda', layout: 'layouts/admin_layout', data});
    }
});

router.get('/tambah_agenda', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/tambah_agenda', {title: 'Tambah Agenda', layout: 'layouts/admin_layout'});
    }
});

router.get('/edit_agenda/:agendaId', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const agenda = await Agenda.findOne({agendaId: req.params.agendaId})
        res.render('admin/edit_agenda', {title: 'Edit Agenda', layout: 'layouts/admin_layout', agenda});
    }
});

router.get('/:agendaId', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const agenda = await Agenda.findOne({agendaId: req.params.agendaId});
        res.render('admin/detail', {title: 'Detail', layout: 'layouts/admin_layout', agenda});
    }
});

module.exports = router;