const Intervention = require("../models/Intervention");

exports.createIntervention = (req, res, next) => {
    delete req.body._id;
    delete req.body.numAgent;
    const intervention = new Intervention({
        ...req.body,
        numAgent: req.auth.numAgent
    });

    intervention.save()
        .then(() => res.status(201).json({message : "Intervention enregistrée"}))
        .catch(error => res.status(400).json({error}));
}

exports.getAgentInterventions = (req, res, next) => {
    Intervention.findOne({numAgent: req.auth.numAgent})
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}));
}

exports.getAllInterventions = (req, res, next) => {
    Intervention.find()
        .then(intervention => res.status(200).json(intervention))
        .catch(error => res.status(400).json({error}));
}

exports.deleteIntervention = (req, res, next) => {
    Intervention.findOne({_id: req.params.id})
        .then(intervention => {
            if (!intervention) {
                return res.status(404).json({message: "intervention introuvable"});
            }
            if (intervention.numAgent == req.auth.numAgent) {
                Intervention.deleteOne({_id: req.params.id})
                    .then(() => {res.status(200).json({message : "Intervention supprimée"})})
                    .catch(error => res.status(400).json({error}))
            }
            else {
                return res.status(401).json({message: "Ce n’est pas votre intervention”"});
            }
        })
        .catch(error => res.status(400).json({error}));
}