/* global define */

define([
    'can/map',
    '../../js/models/article',
    'can/list/promise',
    'can/map/define',
], function (Map, Article) {
    'use strict';
    
    return Map.extend({
        offset: undefined,
        title:'WordPress Viewer App',
        loadArticles: function (currentValue) {
            if (this.offset === undefined) {
                this.offset = 0;
            } else {
                this.offset += 10;
            }
            
            var findAll = Article.findAll(
                {
                    type: this.attr('type'), 
                    offset: this.offset
                },
                function (articles) {
                    return articles;
                }, function (xhr){
                    console.log('Error loading Articles: ' + xhr);
            });
            
            if (!currentValue.length) {
                currentValue.replace(findAll);
            } else { // append new articles to list
                findAll.then(function (list) {
                    list.each(function (element, index) {
                        currentValue.push(element);
                    });
                });
                
            }
            
            return currentValue;
        },
        define: {
            articles: {
                Value: Article.List,
                get: function (currentValue) {
                    return this.loadArticles(currentValue);
                }
            }
        }
    });
});