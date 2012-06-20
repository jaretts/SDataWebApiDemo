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

define('Sage/Platform/Mobile/Format', ['dojo', 'dojo/string'], function() {

    dojo.setObject('Sage.Platform.Mobile.Format', null);

    getVectorMaxSize = function (v) {
        var w = h = 1;
        for (var i = 0; i < v.length; i++) {
            for (var j = 0; j < v[i].length; j++) {
                if (w < v[i][j][0]) { w = v[i][j][0]; }
                if (h < v[i][j][1]) { h = v[i][j][1]; }
            }
        }
        // maybe should return bounding box? (x,y,w,h)
        return { width: w, height: h };
    }

    return Sage.Platform.Mobile.Format = (function() {
        function isEmpty(val) {
            if (typeof val !== 'string') return !val;

            return (val.length <= 0);
        }

        function encode(val) {
            if (typeof val !== 'string') return val;

            return val
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function decode(val) {
            if (typeof val !== 'string') return val;

            return val
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"');
        }

        return {
            encode: encode,
            isEmpty: isEmpty,
            link: function(val) {
                if (typeof val !== 'string')
                    return val;

                return dojo.string.substitute('<a target="_blank" href="http://${0}">${0}</a>', [val]);
            },
            mail: function(val) {
                if (typeof val !== 'string')
                    return val;

                return dojo.string.substitute('<a href="mailto:${0}">${0}</a>', [val]);
            },
            trim: function(val) {
                return val.replace(/^\s+|\s+$/g,'');
            },
            date: function(val, fmt, utc) {
                var date = val instanceof Date
                    ? val
                    : Sage.Platform.Mobile.Convert.isDateString(val)
                        ? Sage.Platform.Mobile.Convert.toDateFromString(val)
                        : null;

                if (date)
                {
                    if (utc) date = date.clone().add({minutes: date.getTimezoneOffset()});

                    return date.toString(fmt || Date.CultureInfo.formatPatterns.shortDate);
                }

                return val;
            },
            fixed: function(val, d) {
                if (typeof d !== 'number')
                    d = 2;

                var m = Math.pow(10, d),
                    v = Math.floor(parseFloat(val) * m) / m;

                return v;
            },
            percent: function(val) {
                    var intVal = Math.floor(100 * (parseFloat(val) || 0));
                    return intVal + "%";
            },
            yesNo: function(val) {
                if (typeof val === 'string') val = /^true$/i.test(val);

                return val
                    ? Sage.Platform.Mobile.Format.yesText || 'Yes'
                    : Sage.Platform.Mobile.Format.noText || 'No';
            },
            bool: function(val) {
                if (typeof val === 'string') val = /^true$/i.test(val);

                return val
                    ? Sage.Platform.Mobile.Format.trueText || 'T'
                    : Sage.Platform.Mobile.Format.falseText || 'F';
            },
            nl2br: function(val) {
                if (typeof val !== 'string') return val;

                return val.replace(/\n/g, '<br />');
            },
            timespan: function(val) {
                var v = Sage.Platform.Mobile.Format.fixed(val);
                var format = Sage.Platform.Mobile.Format;

                if (isNaN(v) || !v) return '';

                var hrs = Math.floor(v / 60);
                var mins  = v % 60;

                if (hrs)
                    hrs = hrs > 1 ? dojo.string.substitute('${0} ${1} ', [hrs, (format.hoursText || 'hours')])
                                  : dojo.string.substitute('${0} ${1} ', [hrs, (format.hourText || 'hour')]);
                if (mins)
                    mins = mins > 1 ? dojo.string.substitute('${0} ${1}', [mins, (format.minutesText || 'minutes')])
                                    : dojo.string.substitute('${0} ${1}', [mins, (format.minuteText || 'minute')]);

                return (hrs && mins) ? hrs + mins
                                     : hrs === 0 ? mins : hrs;
            },
            canvasDraw: function (vector, canvas, options) {
                var scale, x, y,
                    context = canvas.getContext('2d');

                // Paint canvas white vs. clearing as on Android imageFromVector alpha pixels blacken
                // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = 'rgb(255,255,255)';
                context.fillRect (0, 0, context.canvas.width, context.canvas.height);

                scale               = options && options.scale     ? options.scale     : 1;
                context.lineWidth   = options && options.lineWidth ? options.lineWidth : 1;
                context.strokeStyle = options && options.penColor  ? options.penColor  : 'black';

                for (trace in vector) {
                    if ( 1 < vector[trace].length) {
                        context.beginPath();
                        context.moveTo(vector[trace][0][0] * scale, vector[trace][0][1] * scale);
                        for (var i = 1; i < vector[trace].length; i++) {
                            x = vector[trace][i][0] * scale;
                            y = vector[trace][i][1] * scale;
                            context.lineTo(x, y);
                        }
                        context.stroke();
                    }
                }
            },
            imageFromVector: function (vector, options, html) {
                var img,
                    canvasNode = document.createElement('canvas');

                options = options || {}

                if (typeof vector == 'string' || vector instanceof String)
                    try { vector = JSON.parse(vector); } catch(e) {}

                if (!(vector instanceof Array) || 0 == vector.length)
                    vector = [[]]; // blank image.

                var size = getVectorMaxSize(vector);

                canvasNode.width  = options.width  || size.width;
                canvasNode.height = options.height || size.height;

                options.scale = Math.min(
                    canvasNode.width  / size.width,
                    canvasNode.height / size.height
                );

                Sage.Platform.Mobile.Format.canvasDraw(vector, canvasNode, options);

                img = canvasNode.toDataURL('image/png');
                if (img.indexOf("data:image/png") != 0)
                    img = Canvas2Image.saveAsBMP(canvasNode, true).src;

                return html
                    ? dojo.string.substitute(
                        '<img src="${0}" width="${1}" height="${2}" alt="${3}" />',
                        [img, options.width, options.height, options.title || ''])
                    : img;
            }
        };
    })();
});