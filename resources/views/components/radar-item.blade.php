<div class="radar-item">
    <img class="map-background" src="{{ $mapBackground }}">
    <img class="map-border-layer" src="{{ $mapBorderLayer }}">
    <div class="frame-misc">
        <p class="radar-type">{{ $radarDescription }}</p>
        <p class="frame-timestamp">00:00</p>
    </div>
    <div class="frame-list" data-host="{{ $host }}" data-version="{{ $version }}" data-type="{{ $radarType }}" data-hist="{{ $history }}" data-fcast="{{ $forecast }}">
    </div>
</div>
