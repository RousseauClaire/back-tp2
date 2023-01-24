const Agent = require("../models/Agent");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(mdpHash => {
            const agent = new Agent({
                numAgent: req.body.numAgent,
                grade: req.body.grade,
                password: mdpHash
            });
            agent.save()
                .then(agent => res.status(200).json({
                    _id: agent._id
                }))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error =>res.status(500).json({error}));
}

exports.login = (req, res, next) => {
    Agent.findOne({numAgent: req.body.numAgent, grade: req.body.grade})
        .then(agent => {
            if (!agent) {
                return res.status(401).json({message: "Agent introuvable"});
            }
            bcrypt.compare(req.body.password, agent.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: "Agent introuvable"});
                    }
                    res.status(200).json({
                        numAgent: agent.numAgent,
                        token: jwt.sign(
                            {numAgent: agent.numAgent},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: "24h"}
                        )
                    })

                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => {
            res.status(400).json({error});
        });
}

exports.updateAgent = (req, res, next) => {
    if (req.body.numAgent && req.body.numAgent !== req.auth.numAgent) {
        return res.status(401).json({message: "Pas autorisé, vous ne povez pas modifier un autre Agent"});
    }
    Agent.findOne({numAgent: req.auth.numAgent})
        .then(agent => {
            if (!agent) {
                return res.status(401).json({message: "Pas autorisé"});
            }
            // Seul le grade est enregistré
            Agent.updateOne({numAgent: req.auth.numAgent}, {grade: req.body.grade, numAgent: req.auth.numAgent})
                .then(() => res.status(200).json({message: "Agent modifié"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
}