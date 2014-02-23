var socket = io.connect('http://'+location.hostname+':3000');

(function() {
    'use strict';

    function getVideo() {
        document._video = document.getElementById('video');
    }

    function getCountdown () {
        document._countdown = document.getElementById('countdown');
    }

    function updateProperties() {
        socket.emit('timestamp', {
            timestamp: document._video.currentTime,
            duration: document._video.duration
        });
    }

    function playVideo() {
        document._video.volume = 0;
        document._video.play();
    }

    function toggleVideo() {
        if (document._video.paused) {
            document._video.play();
        }else{
            document._video.pause();
        }
    }


    getCountdown();
    getVideo();
    
    if(document._video){
        playVideo();
        setInterval(updateProperties, 100);
        
        socket.on('toggle', function() {
            toggleVideo();
        });
    }

    if (document._countdown) {
        socket.on('updateTimestamp', function(data) {
            var timeLeft = Math.floor(data.timestamp.timestamp - data.timestamp.duration) * -1;
            $(document._countdown).text( timeLeft + " sec");
        });

        $(document._countdown).click(function(event) {
            socket.emit('toggle');

        });

    };

})();

// console.log('\'Allo \'Allo!');