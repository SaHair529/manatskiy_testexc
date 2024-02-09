<?php

use App\Http\Controllers\LogsController;
use Illuminate\Support\Facades\Route;

Route::post('/logs', [LogsController::class, 'store']);
