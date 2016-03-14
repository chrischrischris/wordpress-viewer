/* global define */

define([
    'can/util/library',
    'can/model',
    'can/map/define'
], function (can) {
    'use strict';

    // TODO: Move to global config location
    var wpPostsURL = 'https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts';
    var Article = can.Model.extend({
        findAll: 'GET ' + wpPostsURL + '?number=10',
        findOne: 'GET ' + wpPostsURL + '/{id}',
        parseModels: function (data) {
            this.totalPostCount = data.found;
            return data.posts;
        }
    }, {
        define: {
            totalPostCount: {
                type: "number",
                value: 0,
                set: function (newVal) {
                    // totalPostCount can never be < 0
                    if (newVal === undefined || newVal === null || newVal < 0) {
                        return 0;
                    } else {
                        return newVal;
                    }
                }
            },
            previewImg: {
                type: "string",
                value: "notSetPreviewImgURL",
                get: function () {
                    if (this.attr('attachments') && Object.keys(this.attr('attachments')).length) {
                        // return the first attachment imageURL
                        for (var attachmentKey in this.attr('attachments')) {
                            if (!attachmentKey.startsWith("_")) {
                                return this.attr('attachments')[attachmentKey].URL;
                            }
                        }
                    }
                    return "";
                }
            }
        }
    });

    return Article;
});
