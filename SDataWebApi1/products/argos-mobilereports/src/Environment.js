define('Mobile/Reports/Environment', ['dojo'], function() {
    // todo: open a new browser window for these when on a mobile device?
    // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
    // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
    return dojo.setObject('Mobile.Reports.Environment', {
        initiateCall: function(number) {
            setTimeout(function() {
                window.location.href = dojo.string.substitute("tel:${0}", [number]);
            }, 50);
        },
        initiateEmail: function(email, subject, body) {
            setTimeout(function() {
                window.location.href = dojo.string.substitute("mailto:${0}?subject=${1}&body=${2}", [email, subject||'', body||'']);
            }, 50);
        },
        showMapForAddress: function(address) {
            setTimeout(function() {
                var eventFire = function(node, eventType){
                    if (node.fireEvent) { // for IE
                        node.fireEvent('on' + eventType);
                        node[eventType]();
                    } else {
                        var event = document.createEvent('MouseEvents');
                        event.initEvent(eventType, true, false);
                        node.dispatchEvent(event);
                    }
                };

                var hiddenLink = dojo.create('a', {
                    href: dojo.string.substitute("http://maps.google.com/maps?q=${0}", [address]),
                    target: '_blank'
                }, dojo.body(), 'last');

                eventFire(hiddenLink, 'click');

                dojo.destroy(hiddenLink);

            }, 50);
        }
    });
});
