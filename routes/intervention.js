const express = require('express');
const router = express.Router();
const interventionController = require("../controllers/intervention");
const auth = require('../middlewares/auth')

// POST
// Créer une intervention en base de données
router.post('/', auth, interventionController.createIntervention);

// GET
// Récupère les interventions de l'agent connecté
router.get('/', auth, interventionController.getAgentInterventions);

// GET
// Récupère toutes les interventions
router.get('/all', interventionController.getAllInterventions);

// DELETE
// Supprime une intervention de la base de données
router.delete('/:id', auth, interventionController.deleteIntervention);

module.exports = router;