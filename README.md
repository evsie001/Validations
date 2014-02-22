# Validations

Validations is an addition to [Mootools](http://mootools.net/) [Class.Extras](https://github.com/mootools/mootools-core/blob/master/Source/Class/Class.Extras.js), providing the ability to run any number of validations on a class.

Validations is inspired by Mootools own [Events](http://mootools.net/docs/core/Class/Class.Extras#Events) and by [caolan](https://github.com/caolan)'s [async.js](https://github.com/caolan/async).

## Usage

The most basic usage is to create a group of validations to be run when asked. The `validate` method takes a `callback`, with `err` as the __first__ argument, in the `async.js` style.

```
var ValidatableClass = new Class({
    Implements: Validations
});

var validateMe = new ValidatableClass();

var myGreatValidation = function (callback) {
    if (1===2) {
        callback("Something is wrong, here.");
    } else {
        callback();
    }
};

validateMe.addValidation(myGreatValidation);

validateMe.validate(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Everything is so great!");
    }
});
```

## Documentation

### addValidation(fn)

Add a new validation function, to be executed when `validate` is called.

Validation functions should take a `callback` argument, to be called upon deciding whether the validation has passed or failed.

The `callback` will accept an `err` as the first argument when the validation fails. When the validation passes, ensure that the first argument passed to the `callback` is falsey (`null`, `false`, etc).

#### Syntax

`myClass.addValidation(fn);`

#### Arguments

1. fn - (function) The validation function to execute.

#### Returns

- (object) This Class instance.

#### Example

```
var myValidation = function (callback) {
    if (validateMe.hasNeededProperty()) {
        callback(null);
    } else {
        callback("Does not have Needed Property.");
    }
};

validateMe.addValidation(myValidation);
```

- - -

### addValidations(arr)

Add an array of validation functions to be executed when `validate` is called.

#### Syntax

`myClass.addValidations(arr);`

#### Arguments

1. arr - (array) An array of validation functions to execute.

#### Returns

- (object) This Class instance.

#### Example

```
var myValidation = function (callback) {
    if (validateMe.hasNeededProperty()) {
        callback(null);
    } else {
        callback("Does not have Needed Property.");
    }
};

var myOtherValidation = function (callback) {
    if (validateMe.hasOtherNeededProperty()) {
        callback(null);
    } else {
        callback("Does not have Needed Property.");
    }
};

validateMe.addValidations([myValidation, myOtherValidation]);
```

- - -

### removeValidation(fn)

Remove a validation function from being executed when `validate` is called.

#### Syntax

`myClass.removeValidation(fn);`

#### Arguments

1. fn - (function) The validation function to remove.

#### Returns

- (object) This Class instance.

#### Example

```
validateMe.removeValidation(myOtherValidation);
```

- - -

### removeValidations()

Remove all validation functions from being executed when `validate` is called.

#### Syntax

`myClass.removeValidations();`

#### Returns

- (object) This Class instance.

#### Example

```
validateMe.removeValidations();
```

- - -

### validate(callback)

Each validation function is called with a callback for when they have all finished. If any validation function passes an error to this callback, the main callback is immediately called with the error.

#### Syntax

`myClass.validate(callback);`

#### Arguments

1. callback - (function) Callback function to be executed when all of the validation functions complete, or when any one of them passes an error.

#### Returns

- (object) This Class instance.

#### Example

```
validateMe.validate(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Everything is so great!");
    }
});
```
