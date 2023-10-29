<?php include 'header.php'; ?>
<div class="content" id="warning-page">
    <section id="warnings">
        <div class="container">
            <div class="col">
                <h4>Overzicht</h4>
            </div>
            <div class="col" id="warning-overview">
                <i class="fa-solid fa-warning"></i>
                <p id="warning-title">Geen waarschuwingen</p>
                <p id="warning-description">Voor 0 locaties</p>
            </div>
        </div>
        <br>
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Dagelijkse waarschuwingskaarten</h4>
                    <button data-flipped="normal" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="warning-maps" id="warning-maps" data-scroll>
                    </div>
                    <div class="col content-scroller">
                        <button class="scroll-up" class="nav-button">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="scroll-down" class="nav-button">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Waarschuwingen per locatie</h4>
                    <button data-flipped="normal" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="warning-list" id="warning-list" data-scroll>
                    </div>
                    <div class="col content-scroller">
                        <button class="scroll-up" class="nav-button">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="scroll-down" class="nav-button">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Estofex</h4>
                    <button data-flipped="normal" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="warning-list" id="warning-list" data-scroll>
                    </div>
                    <div class="col content-scroller">
                        <button class="scroll-up" class="nav-button">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="scroll-down" class="nav-button">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>