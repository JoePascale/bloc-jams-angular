(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc Current album that should display based on Fixtures.js service
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
        
        currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });
        
        
        /**
        * @function playSong
        * @desc Plays new audio file as currentBuzzObject & sets song playing condition to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        
        /**
        * @function stopSong
        * @desc Stops song from playing
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        
        /**
        * @function getSongIndex
        * @desc Returns index of song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @desc Current volume of currently playing song
        * @type {Number}
        */
        SongPlayer.volume = null;
        
        
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            ///because player bar can't pass song in as argument
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        //adds pause method
        SongPlayer.pause = function(song) {
            ///because player bar can't pass song in as argument
            song = song || SongPlayer.currentSong;
            
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        /**
        * @function SongPlayer.previous
        * @desc Changes currentSongIndex to the previous song by finding song index and decrementing
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            //if user is on first track in index, then stop the currently playing song and set value of currently playing song to the first song
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        
        /**
        * @function SongPlayer.next
        * @desc Changes currentSongIndex to the next song by finding song index and incrementing
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            //if user is on last track in index, then loop back around to 0
            if (currentSongIndex === (currentAlbum.songs.length - 1)) {
                currentSongIndex = 0;
            }
            
            var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
        * @function setVolume
        * @desc Set volume of currently playing song
        * @param {Number} volume
        */
        SongPlayer.setVolume() = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        
        
        return SongPlayer;
        
    }
 
    angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();