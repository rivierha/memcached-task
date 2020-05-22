'use strict';
module.exports = function (app) {
  var eventsList = require('./controllers/events-controller');
  var generateEvent = require('./index')
  // events Routes
  app.route('/events')
    .get(eventsList.list_all_events)
    .post(eventsList.create_an_event);

  app.route('/generate').get(generateEvent.randomEvents);

  app.route('/events/:eventId')
    .get(eventsList.read_an_event)
    .put(eventsList.update_an_event)
    .delete(eventsList.delete_an_event);
};
