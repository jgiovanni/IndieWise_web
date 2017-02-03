@extends('master')

@section('layout')
    <project id="{{ $project->id }}"></project>
@endsection

@section('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>
    <script type="text/javascript" src="{{ elixir('js/videojs.js') }}"></script>
@endsection
