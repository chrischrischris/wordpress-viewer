/* global define */

/* ArticleTile component: Displays a single wordpress article as
    a picture tile with title. */

define([
    'can/view',
    'can/component',
    '../../components/article-tile/article-tile-viewmodel',
    'can/view/stache',
],function (can, Component, atViewModel) {
    'use strict';

    return Component.extend({
        tag: 'article-tile',
        template: can.view('../components/article-tile/article-tile.stache'),
        viewModel: atViewModel
    });
});
