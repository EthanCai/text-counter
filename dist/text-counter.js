/*
 *  text-counter - v1.0.0
 *  A simple text counter for input and text area 
 *  https://github.com/EthanCai/text-counter
 *
 *  Made by ethan cai <ethancai@qq.com>
 *  Under MIT License
 */
(function(factory) {
    // UMD export
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
        return;
    }

    if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            var w; // Holds the window or root instance to pass to the plugin
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                    w = window;
                } else {
                    jQuery = require('jquery')(root);
                    w = root;
                }
            }
            factory(jQuery, w);
            return jQuery;
        };
        return;
    }

    // Browser globals
    factory(jQuery, window);
}(function($, window, undefined) {

    function isChinese(str) {
        var zhPrtn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        return zhPrtn.test(str);
    }

    function strlen(str) {
        var result = 0;
        for (var i in str) {
            var c = str.charAt(i);
            var len = isChinese(c) ? 2 : 1;
            result = result + len;
        }
        return result;
    }

    function format(template) {
        var prtn = /\{\d+\}/;
        if (!prtn.test(template) || arguments.length <= 1) {
            return template;
        }

        var result = template;
        for (var i = 0; i < arguments.length; i++) {
            var placeHolder = ['{', i, '}'].join('');
            result = result.replace(placeHolder, arguments[i + 1]);
        }
        return result;
    }

    $.fn.textCounter = function(options) {
        var defaults = { // default options
            limit: 0
        };
        options = $.extend(defaults, options);

        // and the plugin begins
        return this.each(function() {

            var elem = $(this);
            var tip;

            (function() { // initialize text counter

                tip = $('<span class="text-counter">' +
                    format('最多填写{0}个字符', options.limit) +
                    '</span>');
                elem.after(tip);

            })();

            var count = function() {
                var text = elem.val();
                var wordcount = strlen(text);
                tip.text(format('已填写{0}/{1}个字符', wordcount, options.limit));
                if (wordcount > options.limit) {
                    tip.css('color', '#DD0000');
                }
            };

            elem.keyup(count).blur(count); //update counter when keyup, blur event is triggered
        });
    };

}));
