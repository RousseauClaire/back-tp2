const express = require('express');
const router = express.Router();
const authController = require("../controllers/agent");
const auth = require('../middlewares/auth');

// POST
// Enregistrer un agent
router.post('/register', authController.register);

// POST
// Connecter un agent
router.post('/login', authController.login);

// POST
// Mettre à jour un agent
router.post('/update', auth, authController.updateAgent);

module.exports = router;