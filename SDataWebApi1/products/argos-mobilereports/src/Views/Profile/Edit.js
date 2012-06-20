define('Mobile/Reports/Views/Profile/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.Reports.Views.Profile.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        emailText: 'email',
        firstNameText: 'first name',
        lastNameText: 'last name',
        companyText: 'company',
        alternateEmailText: 'alt. email',

        //View Properties
        entityName: 'Profile',
        id: 'profile_edit',
        querySelect: [
        ],
        resourceKind: 'profiles',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.emailText,
                name: 'Email',
                property: 'Email',
                type: 'text',
                validator: Mobile.Reports.Validator.hasText
            },{
                label: this.firstNameText,
                name: 'FirstName',
                property: 'FirstName',
                type: 'text',
                validator: Mobile.Reports.Validator.hasText
            },{
                label: this.lastNameText,
                name: 'LastName',
                property: 'LastName',
                type: 'text',
                validator: Mobile.Reports.Validator.hasText
            },{
                label: this.companyText,
                name: 'Company',
                property: 'Company',
                type: 'text',
                validator: Mobile.Reports.Validator.hasText
            },{
                label: this.alternateEmailText,
                name: 'AlternateEmail',
                property: 'AlternateEmail',
                type: 'text'
            }]);
        },

        /* no-request tweak for demo purposes */
        createRequest: function() {
            return {
                create: function(entry, options) {
                    if (options.success) options.success.call(options.scope || this, entry);
                },
                update: function(entry, options) {
                    var view = options.scope;
                    if (view && view.options) dojo.mixin(view.options.entry, entry);
                    if (options.success) options.success.call(options.scope || this, entry);
                }
            };
        }
    });
});