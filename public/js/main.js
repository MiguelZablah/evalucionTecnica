!function (n, t) { "use strict"; var r = n.fn.val; n.fn.val = function (n) { if (!arguments.length) return r.call(this); var e = r.call(this, n); return t.element(this[0]).triggerHandler("input"), e } }(window.jQuery, window.angular);

$.get("http://ipinfo.io", function (response) {
    var city = response.city;
    var contry = response.country;
    $("#ciudad").val(city + ', ' + contry).trigger('input');
}, "jsonp");