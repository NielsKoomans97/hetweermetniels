<section class="hero">
    <div class="banner-overlay"></div>
    <img src="{{ $backgroundimage }}" class="hero-banner">
    <div class="container">
        <div class="message-container">
            <p class="hero-message">{{ $message }}</p>
        </div>
        <x-radar-item host="weerplaza" radar-type="radarnl-observations" history="0" forecast="0" />
        <x-radar-item host="buienradar" radar-type="WeatherMapActualTemperature10mNL" history="18" forecast="0" />
    </div>
</section>
