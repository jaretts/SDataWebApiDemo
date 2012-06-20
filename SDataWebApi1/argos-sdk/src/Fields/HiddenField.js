/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define('Sage/Platform/Mobile/Fields/HiddenField', ['Sage/Platform/Mobile/Fields/TextField'], function() {
    var control = dojo.declare('Sage.Platform.Mobile.Fields.HiddenField', [Sage.Platform.Mobile.Fields.TextField], {
        propertyTemplate: new Simplate([
            '<div style="display: none;" data-field="{%= $.name || $.property %}" data-field-type="{%= $.type %}">',
            '</div>'
        ]),
        widgetTemplate: new Simplate([
            '<input data-dojo-attach-point="inputNode" type="hidden">'
        ]),
        enableClearButton: false,
        bind: function() {
            // call field's bind. we don't want event handlers for this.
            this.inherited(arguments);
        }
    });

    return Sage.Platform.Mobile.FieldManager.register('hidden', control);
});