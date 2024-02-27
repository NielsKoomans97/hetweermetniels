@php
    $routes = Route::getRoutes()->getRoutes();
@endphp
<section class="nav">
    <div class="container">
        <nav>
            @foreach ($routes as $route)
                @if (empty($route->action['prefix']))
                    @php
                        $uri = $route->uri;
                        $name = strpos($uri, '/') > 0 ? substr($uri, strpos($uri, '/')) : 'home';
                    @endphp
                    <a class="nav-button" href="{{ $route->uri }}">{{ $name }}</a>
                @endif
            @endforeach
        </nav>
    </div>
</section>
