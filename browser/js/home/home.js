app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeController',
        resolve: {
        	theUser: function(AuthService) {
				return AuthService.getLoggedInUser()
				.then(function(user){
					return user;
				});
			}
		}
	});
});

app.controller('HomeController', function($rootScope, $scope, AuthService, $state, theUser, PlaylistFactory) {

	if(!theUser) $state.go('landing');
	else {
		PlaylistFactory.getPlaylists()
		.then(function(playlists){
			$scope.hasSongs = false;
			$scope.theUser = theUser;
			$scope.playlists = playlists;
			$scope.view = $scope.theUser.musicLibrary;
			$rootScope.nextSong = $scope.view[0]._id || null;
			$rootScope.currentSong = null;
			$scope.header = "My Library";
			$scope.playlistView = false;


			if ($scope.view.length) {
				$scope.hasSongs = true;
			}
			$scope.load = function(songId, index){
				$scope.current = songId;
				$scope.next = $scope.view[parseInt(index) + 1]._id;
				console.log("CURRENT SONG: ",$scope.current);
				console.log("NEXT SONG: ",$scope.next);
			};
		});
	}



	$scope.removePlaylist = function(id){
		PlaylistFactory.deletePlaylist(id)
		.then(function(){
			$scope.playlists.splice($scope.playlists.indexOf(id));
			$state.go('home');
		});
	};
});
