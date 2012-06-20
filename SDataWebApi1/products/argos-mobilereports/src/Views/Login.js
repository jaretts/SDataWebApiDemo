define('Mobile/Reports/Views/Login', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.Reports.Views.Login', [Sage.Platform.Mobile.Edit], {
        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">',
            '<div class="panel-content" data-dojo-attach-point="contentNode"></div>',
            '<button class="button actionButton" data-action="authenticate"><span>{%: $.logOnText %}</span></button>',
            '<span class="copyright">{%= $.copyrightText %}</span>',
            '</div>'
        ]),

        id: 'login',

        //Localization
        copyrightText: '&copy; 2012 Sage Software, Inc. All rights reserved.',
        logOnText: 'Log On',
        passText: 'password',
        rememberText: 'remember',
        titleText: 'Mobile Reports',
        userText: 'user name',
        invalidUserText: 'The user name or password is invalid.',
        missingUserText: 'The user record was not found.',
        serverProblemText: 'A problem occurred on the server.',
        requestAbortedText: 'The request was aborted.',

        init: function() {
            this.inherited(arguments);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                bbar: false,
                tbar: false
            });
        },
        getContext: function() {
            return {id: this.id};
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'username',
                    label: this.userText,
                    type: 'text'
                },
                {
                    name: 'password',
                    label: this.passText,
                    type: 'text',
                    inputType: 'password'
                },
                {
                    name: 'remember',
                    label: this.rememberText,
                    type: 'boolean'
                }
            ]);
        },
        authenticate: function () {
            if (this.busy) return;

            var credentials = this.getValues(),
                username = credentials && credentials.username;

            if (username && /\w+/.test(username))
                this.validateCredentials(credentials);
        },
        validateCredentials: function (credentials) {
            this.disable();

            App.authenticateUser(credentials, {
                success: function(result) {
                    this.enable();
                    App.navigateToInitialView();
                },
                failure: function(result) {
                    this.enable();

                    if (result.response)
                    {
                        if (result.response.status == 403)
                            alert(this.invalidUserText);
                        else
                            alert(this.serverProblemText);
                    }
                    else
                    {
                        alert(this.missingUserText);
                    }
                },
                aborted: function(result) {
                    this.enable();

                    alert(this.requestAbortedText);
                },
                scope: this
            });
        }
    });
});