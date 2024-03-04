<section class="hero">
    <div class="banner-overlay"></div>
    <img src="{{ $backgroundimage }}" class="hero-banner">
    <div class="container">
        <div class="message-container">
            <p class="hero-message">{{ $message }}</p>
        </div>
        <x-radar-item host="weerplaza" radar-type="radarnl-observations" history="" forecast="" />
        <x-radar-item host="buienradar" radar-type="RadarMapRain15mNL" history="18" forecast="" />
    </div>
</section>
