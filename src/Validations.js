(function () {

    // `global` on the server, `window` in the browser.
    var root = this;

    // Ensure function is only called once.
    // Boosted from: caolan/async
    // https://github.com/caolan/async/blob/master/lib/async.js
    var only_once = function (fn) {
        var called = false;
        return function () {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    // 
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

        validate: function (callback) {
            callback = callback || function () {};

            if (!this.$validations.length) return callback();

            var completed = 0;
            _each(this.$validations, function (validation) {
                validation(only_once(function (err) {
                    if (err) {
                        callback(err);
                        callback = function () {};
                    } else {
                        completed += 1;
                        if (completed >= this.$validations.length) {
                            callback(null);
                        }
                    }
                }.bind(this)));
            }.bind(this));
        }
    });
})();
