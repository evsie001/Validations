(function () {

    // `global` on the server, `window` in the browser.
    var root = this;
    var async = require('async');

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var Validations = root.Validations = new Class({

        // Setup our $validations array.
        $validations: [],

        // Add one validation.
        addValidation: function (fn) {
            var index =  this.$validations.indexOf(fn);
            if (index === -1) this.$validations.push(fn);
            return this;
        },
        // Add an array of validations.
        addValidations: function (arr) {
            _each(arr, function (fn) {
                this.addValidation(fn);
            }.bind(this));
        },

        // Remove one validation.
        removeValidation: function (fn) {
            var index =  this.$validations.indexOf(fn);
            if (index !== -1) delete this.$validations[index];
            return this;
        },
        // Remove all validations.
        removeValidations: function () {
            this.$validations = [];
            return this;
        },

        validate: function (callback, method) {
            callback = callback || function () {};

            if (!this.$validations.length) return callback();

            var allowed_methods = ['series', 'waterfall', 'parallel', ''];

            if (allowed_methods.contains(method)) {
                async[method](this.$validations, callback);
            } else {
                if (method) console.warn(method + " not allowed, using parallel instead.");
                async.parallel(this.$validations, callback);
            }
        }
    });
})();
