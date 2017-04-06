(function() {
    function AlbumCtrl() {
        //Add an albumData property that holds a copy of albumPicasso.
        this.albumData = angular.copy(albumPicasso);
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();