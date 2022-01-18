const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User'); 
const calc = require('../calculations');

router.post('/', verify, async (req, res) => {
    try{
        var asdf = await User.findOneAndUpdate(
            {_id: req.user._id},
            { $push: { activities: { startTime: req.body.startTime, endTime: req.body.endTime } } },
            {
                new: true
            }
        );
        res.send(asdf.activities.pop());
    }catch (err){
        res.status(400).send(err);
    }

});

router.patch('/:activityId', verify, async (req, res) => {
    
    try{
        var asdf = await User.updateOne(
            {_id: req.user._id, "activities._id": req.params.activityId},
            { $set: { "activities.$.startTime": req.body.startTime, "activities.$.endTime": req.body.endTime } }
        );
        res.send(asdf);
    }catch (err){
        res.status(400).send(err);
    }

});

router.get('/', verify, async (req, res) => {
    try{
        const activities = await User.findById(req.user._id, {activities: 1}).sort({startTime: 1});
        const enrich = calc.enrichGetActivities(activities);
        res.send(enrich);
    }catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:activityId', verify, async (req, res) => {
    try{
        const activities = await User.findById(req.user._id, {activities: {$elemMatch: {_id: req.params.activityId}}});
        const enrich = calc.enrich(activities.activities[0]);
        res.send(enrich);
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;