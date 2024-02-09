@extends('layout')

@section('title', 'Светофор')

@section('content')

<div class="container">
    <div class="traffic-light">
        <div class="red light"></div>
        <div class="yellow light"></div>
        <div class="green light"></div>
    </div>
    <button class="forward-button">Вперед</button>
</div>

<div class="logs">
    <h2>Логи:</h2>
    <table>
        <thead>
        <tr>
            <th>Время</th>
            <th>Событие</th>
        </tr>
        </thead>
        <tbody>
        @foreach($logs as $log)
            <tr>
                <td>{{$log->created_at}}</td>
                <td>{{$log->log_message}}</td>
            </tr>
        @endforeach
        {{ $logs->links() }}
        </tbody>
    </table>
</div>
@endsection
