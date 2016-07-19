<?php

namespace IndieWise\Http\Middleware;

use Closure;


class InjectJwtToken
{
    public function handle($request, Closure $next)
    {
        if ($request instanceof \Dingo\Api\Http\InternalRequest) {
            if ($session->has('jwt_token')) {
                $request->headers->set('authorization', sprintf('Bearer %s', $session->get('jwt_token')));
            }
        }

        return $next($request);
    }
}