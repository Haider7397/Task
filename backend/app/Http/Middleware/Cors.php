<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Routing\Middleware;
use Illuminate\Contracts\Routing\ResponseFactory;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
            //->header('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN'])
            // Depending of your application you can't use '*'
            // Some security CORS concerns
            $request->header('Access-Control-Allow-Origin', '*');
            $request->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
            $request->header('Access-Control-Allow-Credentials', 'true');
            $request->header('Access-Control-Max-Age', '10000');
            $request->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $request->header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');
            return $next($request);
    }
}