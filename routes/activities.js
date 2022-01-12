const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User'); 
const calc = require('../calculations');

router.post('/', verify, async (req, res) => {

    try{
        await User.findOneAndUpdate(
            {_id: req.user._id},
            { $push: { activties: { startTime: req.body.startTime, endTime: req.body.endTime } } }
        );
        res.send();
    }catch (err){
        res.status(400).send(err);
    }

});

router.patch('/:activityId', verify, async (req, res) => {
    
    try{
        var asdf = await User.updateOne(
            {_id: req.user._id, "activties._id": req.params.activityId},
            { $set: { "activties.$.startTime": req.body.startTime, "activties.$.endTime": req.body.endTime } }
        );
        res.send(asdf);
    }catch (err){
        res.status(400).send(err);
    }

});

router.get('/', verify, async (req, res) => {
    try{
        const activities = await User.findById(req.user._id, {activities: 1});
        const enrich = calc.enrichGetActivities(activities);
        res.send(enrich);
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;