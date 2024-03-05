<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class radarItem extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public string $host,
        public string $radarType,
        public string $radarDescription,
        public string $history,
        public string $forecast,
        public string $button,
        public string $version = '',
        public string $mapBackground = '',
        public string $mapBorderLayer = '',
    )
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.radar-item');
    }
}
