const express = require('express')
const router = express.Router()
const AgendaController = require('../controllers/agenda')

router.post('/', AgendaController.Add)
router.put('/', AgendaController.Edit)
router.delete('/', AgendaController.Delete)

router.post('/selesai', AgendaController.Selesai)

module.exports = router