define('Mobile/Reports/Validator', ['dojo', 'dojo/string'], function() {
    return dojo.setObject('Mobile.Reports.Validator', {
        exists: {
            fn: function(value) {
                return !value;
            },
            message: "The field '${2}' must have a value."
        },
        notEmpty: {
            test: /.+/,
            message: "The field '${2}' cannot be empty."
        },
        hasText: {
            test: /\w+/,
            message: "The field '${2}' must contain some text."
        },
        isInteger: {
            test: /^\d+$/,
            message: "The value '${0}' is not a valid number."
        },
        isDecimal: {
            test: /^[\d.]+$/,
            message: "The value '${0}' is not a valid number."
        },
        isInt32: {
            fn: function(value, field) {
                if (value && (!/^\d{1,10}$/.test(value) || parseInt(value, 10) > 2147483647))
                    return true;
                return false;
            },
            message: "The field '${2}' value exceeds the allowed numeric range."
        },
        exceedsMaxTextLength: {
            fn: function(value, field) {
                if (value && field && field.maxTextLength && value.length > field.maxTextLength)
                    return true;
                return false;
            },
            message: "The field '${2}' value exceeds the allowed limit in length."
        },
        isDateInRange: {
            fn: function(value, field) {
                var minValue = field.minValue,
                    maxValue = field.maxValue;
                //If value is empty, ignore comparison
                if (!value) return false;

                if (minValue && value instanceof Date && value.compareTo(minValue) === 1) return false;
                if (maxValue && value instanceof Date && value.compareTo(maxValue) === -1) return false;
                return true;
            },
            message: "The field '${2}' value is out of allowed date range."
        },
        isPhoneNumber: { /* todo: remove, depreciated */ }
    });
});

