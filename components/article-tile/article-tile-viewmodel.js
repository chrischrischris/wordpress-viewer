/* global define */

define([
    'can/map',
    'can/map/define',
], function (Map) {
    'use strict';
    
    return Map.extend({
        define: {
            imageUrl: {
                type: "string",
                value: null,
                set: function(newImageUrl) {
                    return newImageUrl;
                }
            },
            articleUrl: {
                type: "string",
                value: null
            },
            articleTitle: {
                type: "string",
                value: null,
                set: function(newTitle) {
                    // decode any HTML entities
                    var txt = document.createElement("textarea");
                    txt.innerHTML = newTitle;
                    return txt.value;
                }
            },
            postDate: {
                type: "date",
                get: function (pd) {
                    // display as YYYY-MM-DD
                    return pd.toISOString().slice(0, 10);
                }
            }
        }
    });
});