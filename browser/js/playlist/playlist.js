app.config(function ($stateProvider) {
    $stateProvider.state('playlist', {
        url: '/playlists/:playlistID',
        templateUrl: 'js/playlist/playlist.html',
        controller: 'PlaylistController',
        resolve: {
        	theUser: function(AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user){
					return user;
				});
        	},
			thePlaylists: function(PlaylistFactory) {
				return PlaylistFactory.getPlaylists();
			},
			thePlaylist: function ($stateParams, PlaylistFactory) {
				if ($stateParams.playlistID) {
					return PlaylistFactory.getPopulatedPlaylist($stateParams.playlistID);
				}
				return null;
			}
        }
    });
});

app.controller('PlaylistController', function($scope, AuthService, $state, theUser, thePlaylists, thePlaylist, PlaylistFactory, $stateParams) {
	if(!theUser) $state.go('landing');
	else {
		$scope.theUser = theUser;
		$scope.playlists = thePlaylists;
		$scope.view = thePlaylist;
		$scope.header = $scope.view.name;
		$scope.playlistView = true;
		$scope.hasSongs = $scope.view.songs.length ? true: false;
	}


	$scope.removePlaylist = function(id){
		PlaylistFactory.deletePlaylist(id)
		.then(function(){
			$scope.playlists.splice($scope.playlists.indexOf(id));
			console.log(thePlaylist);
			if (thePlaylist._id === id) {
				$state.go('home');
			}
		});
	};
	//removes a song from a playlist
	$scope.remove = function(song){
		var songs = $scope.view.songs;
		console.log($scope.view);
		PlaylistFactory.removeFromPlaylist($scope.view._id, song._id)
		.then(function(){
			console.log("removed!");
			$scope.view.songs = _.without($scope.view.songs, $scope.view.songs[$scope.view.songs.indexOf(song)]);
			console.log($scope.view);
			$scope.hasSongs = $scope.view.songs.length ? true: false;
		});
	};
});
