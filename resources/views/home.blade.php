@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    You are logged in!
                </div>
                <p id="power">0</p>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
{{--<script src="{{ asset('assets/js/socket.js') }}"></script>--}}
<script>
//    var url = window.location.origin;
//    var url = 'https://getindiewise.com:3000';
    var url = 'https://54.167.167.156:3000';
    var socket = io(url, {
//        resource: '/socket',
        secure: true,
        reconnect: true,
        reconnectionDelay: 500,
    });
//    var socket = io.connect(url);
    var chosenEvent = "test-channel:IndieWise\\Events\\EventName";
//    var chosenEvent = 'room_' + room.id;
    socket.on(chosenEvent, function (data) {
        console.log(data);
        $('#power').text(parseInt($('#power').text()) + parseInt(message.data.power));
    });

    //var socket = io('http://localhost:3000');
    /*var socket = io(window.location.origin + ':6001');
    socket.on("test-channel:IndieWise\\Events\\EventName", function(message){
        // increase the power everytime we load test route
        $('#power').text(parseInt($('#power').text()) + parseInt(message.data.power));
    });*/
</script>
@endsection
