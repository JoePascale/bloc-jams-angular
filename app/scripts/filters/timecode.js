(function() {
    function timecode() {
        return function(seconds) {
            return currentBuzzObject.toTimer(seconds);
        };
    }
 
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();