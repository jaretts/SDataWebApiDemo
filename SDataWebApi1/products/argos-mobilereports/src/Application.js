define('Mobile/Reports/Application', ['Sage/Platform/Mobile/Application', 'Mobile/Reports/Environment'], function() {
    return dojo.declare('Mobile.Reports.Application', [Sage.Platform.Mobile.Application], {
        navigationState: null,
        rememberNavigationState: true,
        enableUpdateNotification: false,
        enableCaching: true,
        init: function() {
            if (dojo.isIE && dojo.isIE < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);

            this._loadNavigationState();
            this._loadPreferences();
        },
        initConnects: function() {
            this.inherited(arguments);

            if (window.applicationCache)
                this._connects.push(dojo.connect(window.applicationCache, 'updateready', this, this._checkForUpdate));
        },
        _viewTransitionTo: function(view) {
            this.inherited(arguments);

            this._checkSaveNavigationState();
        },
        _checkSaveNavigationState: function() {
            if (this.rememberNavigationState !== false) this._saveNavigationState();
        },
        _checkForUpdate: function() {
            var applicationCache = window.applicationCache;
            if (applicationCache && this.enableUpdateNotification)
            {
                if (applicationCache.status == 4) this._notifyUpdateAvailable();
            }
        },
        _notifyUpdateAvailable: function() {
            if (this.bars['updatebar'])
                this.bars['updatebar'].show();
        },
        _saveNavigationState: function() {
            try
            {
                if (window.localStorage)
                    window.localStorage.setItem('navigationState', dojo.toJson(ReUI.context.history));
            }
            catch (e) { }
        },
        run: function() {
            this.inherited(arguments);

            if (App.isOnline() || !App.enableCaching)
            {
                this.handleAuthentication();
            }
            else
            {
                // todo: always navigate to home when offline? data may not be available for restored state.
                this.navigateToHomeView();
            }

            if (this.enableUpdateNotification) this._checkForUpdate();
        },
        onAuthenticateUserSuccess: function(credentials, callback, scope, result) {
            this.context['user'] = result;

            if (credentials.remember)
            {
                try
                {
                    if (window.localStorage)
                        window.localStorage.setItem('credentials', Base64.encode(dojo.toJson({
                            username: credentials.username,
                            password: credentials.password || ''
                        })));
                }
                catch (e) { }
            }

            if (callback)
                callback.call(scope || this, result);
        },
        onAuthenticateUserFailure: function(callback, scope, response, ajax) {
            if (callback)
                callback.call(scope || this, {response: response});
        },
        authenticateUser: function(credentials, options) {
            switch (credentials.username)
            {
                case 'demo':
                    var entry = {
                        '$key': 19,
                        '$descriptor': 'Demo User',
                        'Profile': {
                            'Email': 'demo@demo.local',
                            'FirstName': 'Demo',
                            'LastName': 'User',
                            'Company': 'Sage',
                            'AlternateEmail': null
                        }
                    };
                    this.onAuthenticateUserSuccess(credentials, options.success, options.scope, entry);
                    break;
                default:
                    this.onAuthenticateUserFailure(options.failure, options.scope, {status: 403}, {});
            }
        },
        reload: function() {
            window.location.reload();
        },
        logOut: function() {
            if (window.localStorage)
            {
                window.localStorage.removeItem('credentials');
                window.localStorage.removeItem('navigationState');
            }

            this.reload();
        },
        handleAuthentication: function() {
            try
            {
                if (window.localStorage)
                {
                    var stored = window.localStorage.getItem('credentials'),
                        encoded = stored && Base64.decode(stored),
                        credentials = encoded && dojo.fromJson(encoded);
                }
            }
            catch (e) { }

            if (credentials)
            {
                this.authenticateUser(credentials, {
                    success: function(result) {
                        this.navigateToInitialView();
                    },
                    failure: function(result) {
                        this.navigateToLoginView();
                    },
                    aborted: function(result) {
                        this.navigateToLoginView();
                    },
                    scope: this
                });
            }
            else
            {
                this.navigateToLoginView();
            }
        },
        _clearNavigationState: function() {
            try
            {
                this.initialNavigationState = null;

                if (window.localStorage)
                    window.localStorage.removeItem('navigationState');
            }
            catch (e) { }
        },
        _loadNavigationState: function() {
            try
            {
                if (window.localStorage)
                    this.navigationState = window.localStorage.getItem('navigationState');
            }
            catch (e) { }
        },
        _loadPreferences: function() {
            try {
                if (window.localStorage)
                    this.preferences = dojo.fromJson(window.localStorage.getItem('preferences'));
            }
            catch(e) {}

            //Probably, the first time, its being accessed, or user cleared
            //the data. So lets initialize the object, with default ones.
            if (!this.preferences)
            {
                var views = this.getDefaultViews();

                this.preferences = {
                    home: {
                        visible: views
                    },
                    configure: {
                        order: views.slice(0)
                    }
                };
            }
        },
        persistPreferences: function() {
            try {
                if (window.localStorage)
                    window.localStorage.setItem('preferences', dojo.toJson(App.preferences));
            }
            catch(e) {}
        },
        getDefaultViews: function() {
            return ['user_report_list'];
        },
        getExposedViews: function() {
            var exposed = [],
                view;

            for (var id in this.views)
            {
                view = App.getView(id);

                if (view.id == 'home') continue;
                if (view.expose) exposed.push(id);
            }

            return exposed;
        },
        cleanRestoredHistory: function(restoredHistory) {
            var result = [],
                hasRoot = false;

            for (var i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--)
            {
                if (App.hasView(restoredHistory[i].page))
                    result.unshift(restoredHistory[i]);

                hasRoot = (restoredHistory[i].page === 'home');
            }

            return hasRoot && result;
        },
        navigateToInitialView: function() {
            try
            {
                var restoredState = this.navigationState,
                    restoredHistory = restoredState && dojo.fromJson(restoredState),
                    cleanedHistory = this.cleanRestoredHistory(restoredHistory);

                this._clearNavigationState();

                if (cleanedHistory)
                {
                    ReUI.context.transitioning = true;
                    ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

                    for (var i = 0; i < cleanedHistory.length - 1; i++)
                    {
                        window.location.hash = cleanedHistory[i].hash;
                    }

                    ReUI.context.transitioning = false;

                    var last = cleanedHistory[cleanedHistory.length - 1],
                        view = App.getView(last.page),
                        options = last.data && last.data.options;

                    view.show(options);
                }
                else
                {
                    this.navigateToHomeView();
                }
            }
            catch (e)
            {
                this._clearNavigationState();

                this.navigateToHomeView();
            }
        },
        navigateToLoginView: function() {
            var view = this.getView('login');
            if (view)
                view.show();
        },
        navigateToHomeView: function() {
            var view = this.getView('home');
            if (view)
                view.show();
        },
        initiateCall: function() {
            // shortcut for environment call
            Mobile.Reporting.Environment.initiateCall.apply(this, arguments);
        },
        initiateEmail: function() {
            // shortcut for environment call
            Mobile.Reporting.Environment.initiateEmail.apply(this, arguments);
        },
        showMapForAddress: function() {
            // shortcut for environment call
            Mobile.Reporting.Environment.showMapForAddress.apply(this, arguments);
        }
    });

});