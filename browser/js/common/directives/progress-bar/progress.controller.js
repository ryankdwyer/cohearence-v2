app.controller('ProgressCtrl', function ($scope, WebPlayerFactory, $interval) {
    // $scope.duration = 0;
    // $scope.timeElapsed = 0;
    // //initialize slider
    // console.log('$scope in progressctrl', $scope);
    // var theSlider = $('#slider');
    // theSlider.slider({
    //     min: 0,
    //     stop: function(event, ui) {
    //         //stop setInterval
    //         //pause video
    //         //get new time
    //         //seek to new time
    //         //continue playing video
    //         //update timeElapsed
    //         $interval.cancel(sliderUpdater);
    //         sliderUpdater = undefined;
    //         $scope.pauseVideo();
    //         var newTime = ui.value;
    //         $scope.seekTo(newTime);
    //         $scope.playVideo();
    //         sliderUpdater = $interval(getTimeFromBackground, 1000)
    //         console.log(newTime);
    //     }
    // });
    // var max = theSlider.slider("option", "max");
    // console.log(sliderMaxTime);

    // //send message to background script to get time elapsed
    // function getTimeFromBackground() {
    //     chrome.runtime.sendMessage('whoIsPlaying', function (response) {
    //         var currentService = PlayerFactory.setCurrentService(response);
    //         var request = {
    //             message: "checkTimeAction",
    //             service: currentService
    //         };
    //         // console.log('making request for time with', request);
    //         chrome.runtime.sendMessage(request, function (response) {
    //             $scope.duration = response.duration;
    //             $scope.timeElapsed = response.currentTime;
    //             if ($scope.duration !== max) {
    //                 max = $scope.duration;
    //                 theSlider.slider("option", "max", max);
    //             }
    //             theSlider.slider({
    //                 value: $scope.timeElapsed
    //             })
    //             $scope.$digest();
    //         });
    //     });
    // }

    // var sliderUpdater = $interval(getTimeFromBackground, 1000);
});
