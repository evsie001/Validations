require('mootools');
require('../src/Validations.js');

describe('Validations', function () {
    var Test,
        t;

    beforeEach(function () {
        Test = new Class({ Implements: Validations });

        t = new Test();
    });

    it('can add one validation', function () {
        var v = function (callback) { callback(); };

        t.addValidation(v);

        expect(t.$validations).toContain(v);
    });
    it('can add validations', function () {
        var v1 = function (callback) { callback(); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        expect(t.$validations).toContain(v1);
        expect(t.$validations).toContain(v2);
        expect(t.$validations).toContain(v3);
    });

    it('can remove one validation', function () {
        var v = function (callback) { callback(); };

        t.addValidation(v);

        t.removeValidation(v);

        expect(t.$validations).not.toContain(v);
    });
    it('can remove all validations', function () {
        var v1 = function (callback) { callback(); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        t.removeValidations();

        expect(t.$validations).not.toContain(v1);
        expect(t.$validations).not.toContain(v2);
        expect(t.$validations).not.toContain(v3);
    });

    it('can handle passing validation', function () {
        var v1 = function (callback) { callback(); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        t.validate(function (err, res) {
            expect(err).not.toBe(true);
        });
    });

    it('can handle failing validation', function () {
        var v1 = function (callback) { callback(true); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        t.validate(function (err, res) {
            expect(err).toBe(true);
        });
    });

    it('can handle mulitple calls to validate (among changing circumstances)', function () {
        var v1 = function (callback) { callback(true); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        t.validate(function (err, res) {
            expect(err).toBe(true);
        });

        t.validate(function (err, res) {
            expect(err).toBe(true);
        });

        t.removeValidation(v1);

        t.validate(function (err, res) {
            expect(err).toBe(false);
        });

        var v4 = function (callback) { callback(); };

        t.addValidation(v4);

        t.validate(function (err, res) {
            expect(err).toBe(false);
        });
    });

    it('can validate using different async methods', function () {
        var v1 = function (callback) { callback(); };
        var v2 = function (callback) { callback(); };
        var v3 = function (callback) { callback(); };

        t.addValidations([v1, v2, v3]);

        t.validate(function (err, res) {
            expect(err).not.toBe(true);
        }, 'series');

        t.validate(function (err, res) {
            expect(err).not.toBe(true);
        }, 'waterfall');

        t.validate(function (err, res) {
            expect(err).not.toBe(true);
        }, 'series');
    });
});
