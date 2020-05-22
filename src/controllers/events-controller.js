'use strict';
var Memcached = require('memcached');

// Created object for memcached
var memcached = new Memcached();

// code to connect with your memecahced server 
memcached.connect('127.0.0.1:11211', function (err, conn) {
    if (err) {
        console.log(conn.server, 'error while memcached connection!!');
    }
});


var mongoose = require('mongoose'),
    Event = mongoose.model('Events');

exports.list_all_events = function (req, res) {
    memcached.get(req.query.eventName, function (err, data) {
        if (!data) {
            data = {
                totalEventsCaptured: 0,
                eventsCapturedByTrackingIds: {}
            }
        }
        res.json(data);
    })

    // return data stored in mongodb
    // Event.find({}, function (err, event) {
    //     if (err)
    //         res.send(err);
    //     res.json(event);
    // });
};


exports.create_an_event = async function (req, res, next) {
    var new_event = new Event(req.body);
    await new_event.save(function (err, event) {
        if (err)
            res.send(err);
        addToMemcached(event);
        res.json(event);
    });
};

exports.addToMemcached = function (event) {
    memcached.get(event.value.event, function (err, data) {
        if (data) {
            data.totalEventsCaptured = data.totalEventsCaptured + 1
            if (data.eventsCapturedByTrackingIds[event.value.trackingId] == null) {
                data.eventsCapturedByTrackingIds[event.value.trackingId] = 1
            } else {
                data.eventsCapturedByTrackingIds[event.value.trackingId] = data.eventsCapturedByTrackingIds[event.value.trackingId] + 1
            }
            memcached.replace(event.value.event, data, 2 * 60, function (err, data) {
                if (err)
                    res.send(err)
            })
            return;
        } else {
            let data = {
                totalEventsCaptured: 1,
                eventsCapturedByTrackingIds: {}
            }
            data.eventsCapturedByTrackingIds[event.value.trackingId] = 1
            memcached.set(event.value.event, data, (2 * 60), function (err, data) {
                if (err)
                    res.send(err)
            });
        }
    });
}

exports.read_an_event = function (req, res) {
    Event.findById(req.params.eventId, function (err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};


exports.update_an_event = function (req, res) {
    Event.findOneAndUpdate({ _id: req.params.eventId }, req.body, { new: true }, function (err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};


exports.delete_an_event = function (req, res) {
    Events.remove({
        _id: req.params.eventId
    }, function (err, event) {
        if (err)
            res.send(err);
        res.json({ message: 'Event successfully deleted', event });
    });
};