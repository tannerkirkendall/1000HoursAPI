const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User'); 
const calc = require('../calculations');
const { isToday } = require('date-fns');

router.get('/', verify, async (req, res) => {
    try{
        const activities = await User.findById(req.user._id, {activities: 1}).sort({startTime: 1});
        const enrich = calc.enrichGetActivities(activities);
        var total = 0;
        var totalToday = 0;
        enrich.forEach(e => {
            total += e.totalElapsedMinutes > 0 ? e.totalElapsedMinutes : 0;
            if (isToday(e.startTime)) totalToday += e.totalElapsedMinutes > 0 ? e.totalElapsedMinutes : 0;
        });

        const data = {
            totalElapsedMinutes : total,
            elapsedHours: Math.floor(total/60),
            elapsedMinutes: total%60,
            totalTodayAllMinutes: totalToday,
            totalTodayHours: Math.floor(totalToday/60),
            todayTodayMinutes: totalToday%60
        }

        res.send(data);
    }catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;