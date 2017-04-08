(function() {
    function AlbumCtrl(Fixtures) {
        //Add an albumData property that holds a copy of albumPicasso.
        this.albumData = Fixtures.getAlbum();
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();