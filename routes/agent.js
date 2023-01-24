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

// PUT
// Mettre à jour un agent
router.put('/update', auth, authController.updateAgent);

module.exports = router;