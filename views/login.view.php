<section class="login-section">
    <h2>Inloggen</h2>
    <?php if (isset($_GET['message'])) { ?> <p class="info-label"><i class="fa-solid fa-info"></i><?= $_GET['message'] ?? ''; ?></p> <?php } ?>
    <form class="login-form" action="/login/process" method="post">
    <div class="form-field" id="field_username">
            <label for="txtUsername">Gebruikersnaam:</label>
            <input type="text" id="txtUsername" name="txtUsername">
        </div>

        <div class="form-field" id="field_password">
            <label for="txtPassword">Wachtwoord:</label>
            <input type="password" id="txtPassword" name="txtPassword">
        </div>

        <a class="secondary-button" href="/register">Registreren</a>
        <input class="primary-button submit-button" type="submit" value="Inloggen">
    </form>
</section>
