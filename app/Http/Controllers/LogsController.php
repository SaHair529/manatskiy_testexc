<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function store(Request $request)
    {
        $log = Log::create($request->all());
        return response()->json($log, 201);
    }
}
