const { differenceInMinutes } = require('date-fns');

const enrichGetActivities = (data) => {
    return data.activities.map(x => {
        return {
            _id: x._id,
            startTime: x.startTime,
            endTime: x.endTime,
            totalElapsedMinutes: differenceInMinutes(x.endTime, x.startTime),
            elapsedHours: Math.floor(differenceInMinutes(x.endTime, x.startTime)/60),
            elapsedMinutes: differenceInMinutes(x.endTime, x.startTime)%60
        }
    }).sort(function compare(a, b) {
        var dateA = new Date(a.startTime);
        var dateB = new Date(b.startTime);
        return dateB - dateA;
      });
}

module.exports.enrichGetActivities = enrichGetActivities;