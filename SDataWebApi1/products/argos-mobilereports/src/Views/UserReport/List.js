define('Mobile/Reports/Views/UserReport/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.Reports.Views.UserReport.List', [Sage.Platform.Mobile.GroupedList], {
        //Templates
        /* feed doesn't have a `$key` property */
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.ReportID %}" data-descriptor="{%: $.ReportDescription %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>{%: $.ReportDescription %}</h3>'
        ]),

        //Localization
        titleText: 'ReportsTest',

        //View Properties
        detailView: 'user_report_detail',
        expose: true,
        icon: 'content/images/icons/reports_24.png',
        id: 'user_report_list',
        queryOrderBy: 'CompanyID asc, ReportDescription asc',
        querySelect: [
            'ReportID',
            'ReportDescription',
            'CompanyID'
        ],
        resourceKind: 'userReports',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        queryWhere: function() {
            return dojo.string.substitute('UserID eq ${0}', [App.context['user']['$key']]);
        },
        getGroupForEntry: function(entry) {
            return {
                tag: entry['CompanyID'],
                title: entry['CompanyID']
            };
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('ReportDescription like "${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });

});