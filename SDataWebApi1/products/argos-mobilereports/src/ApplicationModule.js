define('Mobile/Reports/ApplicationModule', [
    'Sage/Platform/Mobile/ApplicationModule',
    'Mobile/Reports/Format',
    'Mobile/Reports/Template',
    'Mobile/Reports/Validator',
    'Mobile/Reports/Environment',
    'Mobile/Reports/Views/MainToolbar',
    'Mobile/Reports/Views/FooterToolbar',
    'Mobile/Reports/Views/Login',
    'Mobile/Reports/Views/Home',
    'Mobile/Reports/Views/Configure',
    'Mobile/Reports/Views/SelectList',
    'Mobile/Reports/Views/UserReport/List',
    'Mobile/Reports/Views/UserReport/Detail',
    'Mobile/Reports/Views/Customer/List',
    'Mobile/Reports/Views/Profile/Edit'
], function() {
    return dojo.declare('Mobile.Reports.ApplicationModule', [Sage.Platform.Mobile.ApplicationModule], {
        loadViews: function() {
            this.inherited(arguments);

            this.registerView(new Mobile.Reports.Views.Login());
            this.registerView(new Mobile.Reports.Views.Home());
            this.registerView(new Mobile.Reports.Views.Configure());
            this.registerView(new Mobile.Reports.Views.UserReport.List());
            this.registerView(new Mobile.Reports.Views.UserReport.Detail());
            this.registerView(new Mobile.Reports.Views.Customer.List());
            this.registerView(new Mobile.Reports.Views.Profile.Edit());
        },
        loadToolbars: function() {
            this.inherited(arguments);

            this.registerToolbar(new Mobile.Reports.Views.MainToolbar({
                name: 'tbar',
                title: this.titleText
            }));

            this.registerToolbar(new Mobile.Reports.Views.FooterToolbar({
                name: 'bbar'
            }));
        },
        loadCustomizations: function() {
            this.inherited(arguments);
        }
    });

});
