<?php

function radaritem($host, $type){
    echo '  <div class="radar-item" id="'.$type.'">

                <div class="radar-images"></div>
                <img class="background-image">
                <img class="border-layer">
                <div class="time-info-container">
                    <p class="time-heading">Leeg</p>
                    <p class="time-nice">00:00</p>
                </div>
                <img src="'.$host.'" class="logo">
            </div>';
    }
 ?>
