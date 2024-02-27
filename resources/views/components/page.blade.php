@php
    $requestUri = $_SERVER['REQUEST_URI'];
    if ($requestUri != '/') {
        $requestUri = substr($requestUri, strrpos($requestUri, '/'));
    } else {
        $requestUri = 'index';
    }
@endphp
<x-header />
<x-nav />
<section id="{{ $requestUri }}">
    @yield('content')
</section>
<x-footer />
