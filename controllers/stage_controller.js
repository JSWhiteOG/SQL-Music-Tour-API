// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Event, Set_Time, Band, Stage, Stage_Event, Meet_Greet } = db 
const { Op } = require('sequelize')
   
// FIND ALL Stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ [ 'stage_name', 'ASC' ] ],
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC Stage
stages.get('/:name', async (req, res) => {
    try {
        const foundStages = await Stage.findOne({
            where: { stage_id: req.params.id },
            include: [{ 
                model: Event,
                as: 'events', 
                include:[{
                    model: Stage_Event,
                    as: 'stage_events',
                    where:{stage_id: { [Op.like]: `%${req.query.stage ? req.query.stage : ''}%` } }
                }]

            }

            ]
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE A Stage
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// UPDATE A Stage
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_name: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} Stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// DELETE A Stage
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = stages
