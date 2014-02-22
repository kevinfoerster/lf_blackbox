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
            timestamp: document._video.currentTime
        });
    }

    function playVideo() {
        document._video.volume = 0;
        // document._video.play();
    }

    function toggleVideo() {
        if (document._video.paused) {
            document._video.play();
        }else{
            document._video.pause();
        }
    }

    // function connectSocket() {
    //     var socket = io('http://localhost');
    //     socket.on('connect', function() {
    //         socket.on('event', function(data) {});
    //         socket.on('disconnect', function() {});
    //     });

    // }



    // socket.on('news', function(data) {
    //     console.log(data);
    //     socket.emit('toggle', {
    //         socket: 1
    //     });
    // });


    // socket.on('initialState', function(data) {
    //     $.each(data, function(index) {
    //         if (data[index].state) {
    //             $('[data-socket-id=' + data[index].socket + ']').addClass('active');
    //         } else {
    //             $('[data-socket-id=' + data[index].socket + ']').removeClass('active');
    //         }
    //     });
    // });

    // socket.on('updateSocket', function(data) {
    //     console.log(data);
    //     console.log($('[data-socket-id=' + data.socket + ']')[0]);
    //     if (data.state) {
    //         $('[data-socket-id=' + data.socket + ']').addClass('active');
    //     } else {
    //         $('[data-socket-id=' + data.socket + ']').removeClass('active');
    //     }
    // });

    // $(document).ready(function() {
    //     $('.list-group-item').on('click', function(event) {
    //         event.preventDefault();
    //         socket.emit('toggle', {
    //             socket: $(this).data('socket-id')
    //         });
    //     });
    // });


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
            $(document._countdown).text(data.timestamp.timestamp + " sec");
        });

        $(document._countdown).click(function(event) {
            socket.emit('toggle');

        });

    };

})();

// console.log('\'Allo \'Allo!');