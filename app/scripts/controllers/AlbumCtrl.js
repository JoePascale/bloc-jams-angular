(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        //Add an albumData property that holds a copy of albumPicasso.
        this.albumData = Fixtures.getAlbum();
        //adds song player to album view
        this.songPlayer = SongPlayer;
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();