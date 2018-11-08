'use strict';
exports.__esModule = true;
var electron_1 = require("electron");
var _url, url = function () { _url = _url || require('url'); return _url; };
function handleOpenUrl(scheme) {
    var myApp = this;
    var parsed = url().parse(scheme, true);
    switch (parsed.host) {
        case 'quit':
            electron_1.app.quit();
            break;
        case 'open':
        default:
            // open
            break;
    }
}
exports.handleOpenUrl = handleOpenUrl;
