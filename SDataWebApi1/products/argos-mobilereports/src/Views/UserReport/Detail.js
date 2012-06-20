define('Mobile/Reports/Views/UserReport/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.Reports.Views.UserReport.Detail', [Sage.Platform.Mobile.Detail], {
        //Localization
        actionsText: 'Quick Actions',
        emailReportText: 'Email Report',
        descriptionText: 'description',
        companyText: 'company',

        //View Properties
        id: 'user_report_detail',
        resourceKind: 'userReports',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.actionsText,
                list: true,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'EmailReport',
                    provider: function() {
                        return dojo.getObject('Profile.Email', false, App.context['user']);
                    },
                    label: this.emailReportText,
                    icon: 'content/images/icons/letters_24.png',
                    action: 'emailReport'
                }]
            },{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'ReportDescription',
                    property: 'ReportDescription',
                    label: this.descriptionText
                },{
                    name: 'CompanyID',
                    property: 'CompanyID',
                    label: this.companyText
                }]
            }]);
        },
        emailReport: function() {
            alert('Emailing report to ' + dojo.getObject('Profile.Email', false, App.context['user']));
        },

        /* feed does not support predicate requests nor has a `$key` property; have to use resource collection (non-standard) */
        createRequest: function() {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService());

            if (this.resourceKind)
                request.setResourceKind(this.resourceKind);

            if (this.querySelect)
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));

            if (this.queryInclude)
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));

            request.setQueryArg(
                'where', dojo.string.substitute('ReportID eq ${0} and UserID eq ${1}', [parseInt(this.options.key), App.context['user']['$key']])
            );

            return request;
        },

        processEntry: function(feed) {
            arguments[0] = feed['$resources'][0];
            this.inherited(arguments);
        }
    });
});