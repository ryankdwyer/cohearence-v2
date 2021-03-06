function getSongInfo(trackSrc) {
    var songTitle = $('.track_info > .title-section > .title').text().trim() || $('.title_link .title').text().trim() || $('#name-section > .trackTitle').text().trim();
    //front page selection
    var frontPageArtistHref = $('.itemsubtext > .detail_item_link_2');
    // var songHref = frontPageArtistHref.attr('href') || $('.title-section > .title_link').attr('href');
	var songHref = document.location.href;
	console.log("HREF:", songHref);
    var artist = frontPageArtistHref.text().trim() || $('[itemprop="byArtist"] > a').text().trim();
    var duration = $('.time.secondaryText > .time_total').text().trim();
	var bandcampId = trackSrc.split('&id=')[1].split('&stream')[0] || null;
    var songObj = {
        action: 'scrobble',
        message: "Bandcamp",
        title: songTitle,
        artist: artist,
        source: {
            domain: 'Bandcamp',
            url: trackSrc,
            videoTitle: artist + songTitle,
            sourceUrl: songHref,
			bandcampId: bandcampId
        },
        duration: duration,
    };
    console.log("BC songObj:", songObj);
    sendSongToRouter(songObj);
}

function sendSongToRouter(songObj) {
    chrome.runtime.sendMessage(songObj, function (response) {
        console.log('response from router:');
		console.dir(response);
    });
}

function watchAudioTag() {
    var audioTag = $('audio');
    audioTag.watch({
        properties: 'attr_src',
        callback: function (data, i) {
            var newValue = data.vals[i];
            if (newValue.indexOf("http:") < 0) {
                newValue = "http:".concat(newValue);
            }
            console.log("new new value", newValue);
            getSongInfo(newValue);
        }
    });
}

$(document).ready(function () {
    console.log('=====!!!PAGE LOADED!!!=====');
    watchAudioTag();
});
