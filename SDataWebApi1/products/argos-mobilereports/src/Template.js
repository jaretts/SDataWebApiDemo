define('Mobile/Reports/Template', ['dojo'], function() {
    return dojo.setObject('Mobile.Reports.Template', {
        noteDetailProperty: new Simplate([
            '{% var F = Sage.Platform.Mobile.Format; %}',
            '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
                '<label>{%: $.label %}</label>',
                '<pre>',
                '{%= F.encode($.value) %}',
                '</pre>',
            '</div>'
        ])
    });
});
