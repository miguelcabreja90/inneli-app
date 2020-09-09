<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class PingController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'status' => 'ok',
            'success' => true,
            'timestamp' => Carbon::now()->toTimeString()
        ]);
    }
}
