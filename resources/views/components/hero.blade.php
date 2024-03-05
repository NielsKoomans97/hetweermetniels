<section class="hero">
    <img src="{{ $backgroundimage }}" class="hero-banner">
    <div class="banner-overlay"></div>
    <div class="container">
        <x-radar-item host="weerplaza" button="Meer radarbeelden" radar-description="Radar laatste 90 minuten" radar-type="radarnl-observations" history="0" forecast="0" />
        <x-radar-item host="buienradar" button="Meer weerkaarten" version="3" radar-description="Temperatuur laatste 3u" radar-type="WeatherMapActualTemperature10mNL" history="18" forecast="0" />
    </div>
</section>
