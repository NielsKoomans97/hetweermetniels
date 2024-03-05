<section class="hero">
    <div class="banner-overlay"></div>
    <img src="{{ $backgroundimage }}" class="hero-banner">
    <div class="container">
        <x-radar-item host="weerplaza" radar-description="Radar laatste 90 minuten" radar-type="radarnl-observations" history="0" forecast="0" />
        <x-radar-item host="buienradar" version="3" radar-description="Temperatuur laatste 3u" radar-type="WeatherMapActualTemperature10mNL" history="18" forecast="0" />
    </div>
</section>
