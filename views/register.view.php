<section class="register-section">
    <h2>Registreren</h2>
    <?php if (isset($_GET['message'])) { ?> <p class="info-label"><i class="fa-solid fa-info"></i><?= $_GET['message'] ?? ''; ?></p> <?php } ?>
    <form class="register-form" action="/register/process" method="post">
        <div class="form-field" id="field_username">
            <label for="txtUsername">Gebruikersnaam:</label>
            <input type="text" id="txtUsername" name="txtUsername">
        </div>

        <div class="form-field" id="field_email">
            <label for="txtEmail">Emailadres:</label>
            <input type="text" id="txtEmail" name="txtEmail">
        </div>

        <div class="form-field" id="field_password">
            <label for="txtPassword">Wachtwoord:</label>
            <input type="password" id="txtPassword" name="txtPassword">
            <p class="form-field-description">
            <p class="field-description-item" id="special_chars"><i class="fa-solid fa-check"></i>Speciale tekens</p>
            <p class="field-description-item" id="uppercase_chars"><i class="fa-solid fa-check"></i>Hoofdletters</p>
            <p class="field-description-item" id="lowercase_chars"><i class="fa-solid fa-check"></i>Kleine letters</p>
            <p class="field-description-item" id="numbers"><i class="fa-solid fa-check"></i>Cijfers</p>
            </p>
        </div>

        <div class="form-field" id="field_passwordConfirm">
            <label for="txtPasswordConfirm">Herhaal wachtwoord:</label>
            <input type="password" id="txtPasswordConfirm" name="txtPasswordConfirm">
        </div>

        <a class="secondary-button" href="/login">Inloggen</a>
        <input class="primary-button submit-button" type="submit" value="Registreren">
    </form>
    <script src="js/password_securitycheck.js"></script>
</section>
