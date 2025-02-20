// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event, Set_Time, Band, Stage, Stage_Event, Meet_Greet } = db 
const { Op } = require('sequelize')
   
// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.date ? req.query.date : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { event_name: req.params.name },
            include: [ {
                model: Meet_Greet,
                as: 'meet_greets',
                include:{
                    model: Band, 
                    as: "bands",
                    where: { band_id: { [Op.like]: `%${req.query.band ? req.query.band : ''}%` } }
                }

            }, { 
                    model: Set_Time,
                    as: "set_times",
                    include: [{ 
                        model: Band, 
                        as: "bands",
                        where: { band_id: { [Op.like]: `%${req.query.band ? req.query.band : ''}%` } }
                    },{
                        model: Stage,
                        as: 'stages',
                        where: { stage_id: { [Op.like]: `%${req.query.stage ? req.query.stage : ''}%` } }

                    }]
                    

                    },
                { 
                    model: Stage, 
                    as: "stages",
                    include: { 
                        model: Stage_Event, 
                        as: "stage_events",
                        where: { stage_id: { [Op.like]: `%${req.query.stage_event ? req.query.stage_event : ''}%` } }
                    } 
                },
               
                
            ] 
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// UPDATE A EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
// DELETE A EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = events
