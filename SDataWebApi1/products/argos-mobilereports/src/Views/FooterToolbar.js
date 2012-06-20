define('Mobile/Reports/Views/FooterToolbar', ['Sage/Platform/Mobile/MainToolbar'], function() {

    return dojo.declare('Mobile.Reports.Views.FooterToolbar', [Sage.Platform.Mobile.MainToolbar], {
        // Localization
        copyrightText: '&copy; 2012 Sage Software, Inc. All rights reserved.',
        logOutConfirmText: 'Are you sure you want to log out?',
        profileText: 'Profile',
        topText: 'Top',
        logOutText: 'Log Out',

        widgetTemplate: new Simplate([
            '<div class="footer-toolbar {%= $.cls %}">',
            '<hr />',
            '<div data-dojo-attach-point="contentNode"></div>',
            '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>',
            '</div>'
        ]),
        toolTemplate: new Simplate([
            '<button class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">',
            '{% if ($.icon) { %}',
            '<img src="{%= $.icon %}" alt="{%= $.id %}" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',            
            '</button>'
        ]),
        attributeMap: {
            footerContents: {
                node: 'contentNode',
                type: 'innerHTML'
            }
        },

        profileView: 'profile_edit',

        showTools: function(tools) {
            var contents = [];
            if ((tools && tools.length <= 0) || (tools !== false))
            {
                tools = [{
                    id: 'top',
                    title: this.topText,
                    side: 'left',
                    fn: this.scrollToTop,
                    scope: this
                },{
                    id: 'profile',
                    title: this.profileText,
                    side: 'left',
                    fn: this.editProfile,
                    scope: this
                },{
                    id: 'logout',
                    title: this.logOutText,
                    fn: this.logOut,
                    scope: this
                }];

                this.show();
            }
            else if (tools === false)
            {
                this.hide();
            }

            // skip parent implementation
            Sage.Platform.Mobile.MainToolbar.superclass.showTools.apply(this, arguments);

            if (tools)
            {
                for (var i = 0; i < tools.length; i++)
                {
                    contents.push(this.toolTemplate.apply(tools[i]));
                }
                this.set('footerContents', contents.join(''));
            }
        },
        scrollToTop: function() {
            scrollTo(0, 1); 
        },
        logOut: function() {
            var sure = window.confirm(this.logOutConfirmText);
            if (sure) App.logOut();
        },
        editProfile: function() {
            var view = App.getView(this.profileView);
            if (view)
                view.show({entry: App.context['user']['Profile']});
        }
    });
});