(function () {
    'use strict';

    angular
        .module('eventOrganizer')
        .factory('eventOrganizer', eventOrganizer);

    /** @ngInject */
    function eventOrganizer() {
        var eventSubscriptions = {};

        this.subscribe = subscribe;
        this.trigger = trigger;

        function subscribe (eventName, callback) {
            // Retrieve a list of current subscribers for eventName (if any)
            var subscribers = eventSubscriptions[eventName];

            if (typeof subscribers === 'undefined') {
                // If no subscribers for this event were found,
                // initialize a new empty array
                subscribers = eventSubscriptions[eventName] = [];
            }

            // Add the given callback function to the end of the array with
            // eventSubscriptions for this event.
            subscribers.push(callback);
        }

        function trigger (eventName, data, context) {

            var
            // Retrieve a list of subscribers for the event being triggered
                subscribers = eventSubscriptions[eventName],
                i;

            if (typeof subscribers === 'undefined') {
                // No list found for this event, return early to abort execution
                return;
            }

            // Ensure data is an array or is wrapped in an array,
            // for Function.prototype.apply use
            data = (data instanceof Array) ? data : [data];

            // Set a default value for `this` in the callback
            context = context || this;

            for (i = 0; i < subscribers.length; i += 1) {
                subscribers[i].call(context, data);
            }
        }
    }

})();
