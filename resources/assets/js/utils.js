/**
 * Utility Functions
 * Created by Jerez on 11/8/2015.
 */
angular.module('IndieWise.utilities', [])
    .factory('UtilsService', ['$rootScope', '$window', 'DataService', function ($rootScope, $window, DataService) {
        'use strict';
        return {
            compressArray: function (original) {
                var compressed = [];
                // make a copy of the input array
                var copy = original.slice(0);
                // first loop goes over every element
                for (var i = 0; i < original.length; i++) {
                    var myCount = 0;
                    // loop over every element in the copy and see if it's the same
                    for (var w = 0; w < copy.length; w++) {
                        if (original[i] == copy[w]) {
                            // increase amount of times duplicate is found
                            myCount++;
                            // sets item to undefined
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
/**
 *  @function String.reverse
 *  @description Reverse a string
 *  @return string
 **/
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};
//# sourceMappingURL=utils.js.map