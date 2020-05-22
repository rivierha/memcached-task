const data = require('../events');
const config = require('../config');
const rateLimit = require('function-rate-limit');
var eventsList = require('./controllers/events-controller');
var mongoose = require('mongoose'),
    Event = mongoose.model('Events');

const trackingIds = [
    'INF-yj562hjojzbtez',
    'INF-3gbfcjjsd6vhvo',
    'INF-ixpktk3itsk86',
    'INF-1bi5qk0zocqcz'
]
const eventBody = data.events.eventBody
const rate = config.rate;

const rateLimitedFn = rateLimit(rate, 1000, async function (data) {
    var new_event = new Event(data);
    let event = await new_event.save();
    eventsList.addToMemcached(event);
});

exports.randomEvents = function (req, res) {
    for (let i = 0; i < 1000; i++) {
        let randIndex1 = Math.floor(Math.random() * (eventBody.length - 0) + 0);
        let event = eventBody[randIndex1];

        let randIndex2 = Math.floor(Math.random() * (trackingIds.length - 0) + 0);
        let trackingId = trackingIds[randIndex2];
        event.value.trackingId = trackingId;
        rateLimitedFn(event)
    }
    res.json({ message: 'generating events!' });
}

