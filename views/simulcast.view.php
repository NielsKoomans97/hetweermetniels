<div class="sidebar">
    <?=
        radaritem('weerplaza', 'radarnl-observations');
    iframe('https://map.blitzortung.org/');
    radaritem('buienradar', 'SatMapCombined15m');
    ?>
</div>
<div class="slideshow">
    <?=
        radaritem('buienradar', 'WeatherMapActualTemperature10mNL');
    radaritem('buienradar', 'WeatherMapRain24Hours10mNL');
    radaritem('buienradar', 'WeatherMapWind10mNL');
    radaritem('buienradar', 'WeatherMapWindGusts10mNL');
    ?>
</div>
<?= warningoverview();
consolelog();
?>

