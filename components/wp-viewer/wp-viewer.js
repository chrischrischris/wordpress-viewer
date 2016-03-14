/* global define */
define([
    'can/view',
    'can/component',
    '../../components/wp-viewer/wp-viewer-viewmodel',
    '../../components/article-tile/article-tile'
],function (can, Component, wpViewModel) {
    'use strict';

    return Component.extend({
        tag: 'wp-viewer',
        template: can.view('../components/wp-viewer/wp-viewer.stache'),
        viewModel: wpViewModel,
        events: {
            '.loadmore click': function () {
                var self = this;
                this.element.find('.loadmore').text('Loading ...');
                this.viewModel.loadArticles(this.viewModel.attr('articles'))
                .then(function () {
                    // Pause updating of text for a second so that user can actually read "Loading..."
                    setTimeout(function () {
                        self.element.find('.loadmore').text('Load More Articles');
                    }, 1000);
                });
            }
        }
    });
});
