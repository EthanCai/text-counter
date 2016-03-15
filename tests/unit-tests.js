/* jshint undef:false */
(function($, undefined) {

    var elem1;

    (function() {   // initialize before tests
        elem1 = $('<input type="input" />');
        elem1.appendTo('body').textCounter({ limit: 30 });
    })();

    test('if tip is right when initialized', function() {
        equal($('.text-counter').text(), '最多填写30个字符', 'tip should be right when initialized');
    });

    test('if counter is right when input', function() {
        elem1.val('abcd');
        elem1.trigger('keyup');
        equal($('.text-counter').text(), '已填写4/30个字符', 'tip should be right when keyup');

        elem1.val('你好吗');
        elem1.trigger('blur');
        equal($('.text-counter').text(), '已填写6/30个字符', 'tip should be right when blur');
    });

})(jQuery);
