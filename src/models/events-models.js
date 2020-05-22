'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventsSchema = new Schema({
    path: {
        type: String,
    },
    value: {
        fingerprint: {
            type: String,
        },
        sessionId: {
            type: String,
        },
        visitorId: {
            type: String,
        },
        trackingId: {
            type: String,
        },
        event: {
            type: String,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Events', EventsSchema);