<section class="login-section">
    <p class="info-label"><i class="fa-solid fa-info"></i><?= $_GET['message']; ?></p>
    <form class="login-form" action="/login/process" method="post">
        <label for="txtUsername">Gebruikersnaam:</label>
        <input type="text" id="txtUsername" name="txtUsername">

        <label for="txtPassword">Wachtwoord:</label>
        <input type="password" id="txtPassword" name="txtPassword">

        <a class="primary-button" href="/register">Registreren</a>
        <input class="secondary-button submit-button" type="submit" value="Inloggen">
    </form>
</section>
