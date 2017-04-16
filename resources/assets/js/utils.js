angular.module('IndieWise.utilities', [])
    .factory('UtilsService', ['$rootScope', '$window', 'DataService', function ($rootScope, $window, DataService) {
        'use strict';
        return {
            compressArray: function (original) {
                var compressed = [];
                var copy = original.slice(0);
                for (var i = 0; i < original.length; i++) {
                    var myCount = 0;
                    for (var w = 0; w < copy.length; w++) {
                        if (original[i] == copy[w]) {
                            myCount++;
                            delete copy[w];
                        }
                    }
                    if (myCount > 0) {
                        var a = new Object();
                        a.value = original[i];
                        a.count = myCount;
                        compressed.push(a);
                    }
                }
                return compressed;
            },
            parseJwt: function (token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            }
        };
    }]);
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};
//# sourceMappingURL=utils.js.map