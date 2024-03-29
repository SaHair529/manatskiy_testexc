<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index() {
        $logs = Log::orderBy('created_at', 'desc')->paginate(10);
        return view('main.index', ['logs' => $logs]);
    }
}
