@php
    $routes = Route::getRoutes()->getRoutes();
@endphp
<section class="nav">
    <div class="container">
        @foreach ($routes as $route)
            @if (empty($route->action['prefix']))
                <a href="{{ $route->uri }}">link</a>
            @endif
        @endforeach
    </div>
</section>
