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
<script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
{{--<script src="{{ asset('/socket.io/socket.io.js') }}"></script>--}}
<script>
//    var url = window.location.protocol + '//' + window.location.hostname + '/socket';
    var url = /*window.location.origin + */'/socket';
    var socket = io(url, {
        'secure': true,
        'reconnect': true,
        'reconnection delay': 500,
        'max reconnection attempts': 10
    });
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
