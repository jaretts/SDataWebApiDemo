define('Mobile/Reports/Format', ['Sage/Platform/Mobile/Format'], function() {
    return dojo.setObject('Mobile.Reports.Format', dojo.mixin({}, {
        mail: function(val) {
            if (typeof val !== 'string')
                return val;

            return dojo.string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
        }
    }, Sage.Platform.Mobile.Format));
});