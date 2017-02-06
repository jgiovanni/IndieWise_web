@extends('user.index')

@section('view')
    <user-reactions :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-reactions>
@endsection