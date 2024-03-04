@php
    $class = $style;

    if (!empty($extraClass)) {
        $class .= ' ' . $extraClass;
    }
@endphp
@switch($type)
    @case('link')
        <a href="{{ $attributes->get('href') }}" class="{{ $class }}"><i
                class="{{ $icon }}"></i>{{ $slot }}</a>
    @break

    @case('button')
        <button class="{{ $class }}"><i class="{{ $icon }}"></i>{{ $slot }}</button>
    @break

    @default
@endswitch
